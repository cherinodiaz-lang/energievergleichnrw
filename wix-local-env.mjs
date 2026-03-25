import fs from "node:fs";
import path from "node:path";

export const LOCAL_WIX_INSTANCE_PLACEHOLDER = "local-preview-instance-id";
export const LOCAL_WIX_PUBLIC_KEY_PLACEHOLDER = "local-preview-public-key";
export const LOCAL_WIX_SECRET_PLACEHOLDER = "local-preview-secret";

function readWixConfig(rootDir) {
  const wixConfigPath = path.join(rootDir, "wix.config.json");

  if (!fs.existsSync(wixConfigPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(wixConfigPath, "utf8"));
  } catch {
    return null;
  }
}

export function bootstrapWixLocalEnv(env = process.env, rootDir = process.cwd()) {
  const wixConfig = readWixConfig(rootDir);
  const hasRealWixAuth = Boolean(
    env.WIX_CLIENT_INSTANCE_ID &&
      env.WIX_CLIENT_PUBLIC_KEY &&
      env.WIX_CLIENT_SECRET
  );

  if (!env.WIX_CLIENT_ID && typeof wixConfig?.appId === "string" && wixConfig.appId.length > 0) {
    env.WIX_CLIENT_ID = wixConfig.appId;
  }

  if (!hasRealWixAuth) {
    env.WIX_CLIENT_INSTANCE_ID ||= LOCAL_WIX_INSTANCE_PLACEHOLDER;
    env.WIX_CLIENT_PUBLIC_KEY ||= LOCAL_WIX_PUBLIC_KEY_PLACEHOLDER;
    env.WIX_CLIENT_SECRET ||= LOCAL_WIX_SECRET_PLACEHOLDER;
  }

  return {
    hasRealWixAuth,
    hasWixClientId: Boolean(env.WIX_CLIENT_ID),
    wixConfig,
  };
}
