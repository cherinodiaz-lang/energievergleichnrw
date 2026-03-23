export const REQUIRED_WIX_RUNTIME_ENV_KEYS = [
  "WIX_CLIENT_ID",
  "WIX_CLIENT_INSTANCE_ID",
  "WIX_CLIENT_PUBLIC_KEY",
  "WIX_CLIENT_SECRET",
] as const;

export type RequiredWixRuntimeEnvKey = (typeof REQUIRED_WIX_RUNTIME_ENV_KEYS)[number];

function hasValue(input: unknown): boolean {
  return typeof input === "string" && input.trim().length > 0;
}

function readRuntimeEnv(key: RequiredWixRuntimeEnvKey): string | undefined {
  if (typeof process === "undefined" || process.env == null) {
    return undefined;
  }
  return process.env[key];
}

export function getMissingWixRuntimeEnvKeys(): RequiredWixRuntimeEnvKey[] {
  return REQUIRED_WIX_RUNTIME_ENV_KEYS.filter((key) => !hasValue(readRuntimeEnv(key)));
}

export function buildMissingWixRuntimeEnvMessage(
  missingKeys: RequiredWixRuntimeEnvKey[],
): string {
  return `Missing required Wix runtime env variables: ${missingKeys.join(", ")}`;
}
