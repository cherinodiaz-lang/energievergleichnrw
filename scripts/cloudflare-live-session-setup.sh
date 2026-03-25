#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

CONFIG_FILE="${1:-wrangler.jsonc}"
BINDING_NAME="${SESSION_BINDING_NAME:-SESSION}"
PROD_NAMESPACE_NAME="${SESSION_KV_PROD_NAME:-energievergleich-shop-session}"
PREVIEW_NAMESPACE_NAME="${SESSION_KV_PREVIEW_NAME:-energievergleich-shop-session-preview}"
WRANGLER="npx --yes wrangler"

log() {
  printf "%s\n" "$1"
}

status_ok() {
  printf "Status: OK - %s\n" "$1"
}

status_fail() {
  printf "Status: FAIL - %s\n" "$1" >&2
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    status_fail "Command fehlt: $1"
    exit 1
  fi
}

has_real_session_ids() {
  awk -v binding="$BINDING_NAME" '
    BEGIN { in_block=0; prod=0; prev=0 }
    /^[[:space:]]*\/\// { next }
    /"binding"[[:space:]]*:[[:space:]]*"/ {
      if ($0 ~ ("\"binding\"[[:space:]]*:[[:space:]]*\"" binding "\"")) in_block=1
      else in_block=0
    }
    in_block && /"id"[[:space:]]*:[[:space:]]*"[a-f0-9]{32}"/ { prod=1 }
    in_block && /"preview_id"[[:space:]]*:[[:space:]]*"[a-f0-9]{32}"/ { prev=1 }
    END { exit !(prod && prev) }
  ' "$CONFIG_FILE"
}

backup_config() {
  local ts
  ts="$(date +%Y%m%d-%H%M%S)"
  cp "$CONFIG_FILE" "${CONFIG_FILE}.backup.${ts}"
  status_ok "Backup erstellt: ${CONFIG_FILE}.backup.${ts}"
}

check_auth() {
  local out_file
  out_file="$(mktemp)"
  if ! CI=1 $WRANGLER kv namespace list >"$out_file" 2>&1; then
    cat "$out_file" >&2 || true
    rm -f "$out_file"
    status_fail "Wrangler nicht authentifiziert, bitte 'npx wrangler login' oder CLOUDFLARE_API_TOKEN setzen"
    exit 1
  fi

  if rg -q 'not authenticated|wrangler login|CLOUDFLARE_API_TOKEN|non-interactive environment' "$out_file"; then
    cat "$out_file" >&2 || true
    rm -f "$out_file"
    status_fail "Wrangler nicht authentifiziert, bitte 'npx wrangler login' oder CLOUDFLARE_API_TOKEN setzen"
    exit 1
  fi

  rm -f "$out_file"
  status_ok "Cloudflare-Auth aktiv"
}

create_or_update_session_binding() {
  if has_real_session_ids; then
    status_ok "SESSION-Binding mit echten id/preview_id bereits vorhanden"
    return
  fi

  log "SESSION-Binding fehlt oder ist unvollstaendig, Namespace wird erstellt und Config aktualisiert."
  $WRANGLER kv namespace create "$PROD_NAMESPACE_NAME" \
    --binding "$BINDING_NAME" \
    --config "$CONFIG_FILE" \
    --update-config
  status_ok "Production-KV erstellt/zugeordnet"

  $WRANGLER kv namespace create "$PREVIEW_NAMESPACE_NAME" \
    --preview \
    --binding "$BINDING_NAME" \
    --config "$CONFIG_FILE" \
    --update-config
  status_ok "Preview-KV erstellt/zugeordnet"

  if ! has_real_session_ids; then
    status_fail "SESSION-Binding wurde nicht korrekt in ${CONFIG_FILE} geschrieben"
    exit 1
  fi

  status_ok "SESSION-Binding mit echten id/preview_id verifiziert"
}

build_project() {
  npm run build
  status_ok "Build erfolgreich"
}

deploy_project() {
  $WRANGLER deploy --config "$CONFIG_FILE"
  status_ok "Deploy erfolgreich"
}

main() {
  require_cmd rg
  require_cmd npm

  if [ ! -f "$CONFIG_FILE" ]; then
    status_fail "Config nicht gefunden: $CONFIG_FILE"
    exit 1
  fi

  log "1) Auth Check"
  check_auth

  log "2) Backup"
  backup_config

  log "3) SESSION-KV Sicherstellen"
  create_or_update_session_binding

  log "4) Build"
  build_project

  log "5) Deploy"
  deploy_project
}

main "$@"
