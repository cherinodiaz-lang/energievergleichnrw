import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  LOCAL_WIX_INSTANCE_PLACEHOLDER,
  LOCAL_WIX_PUBLIC_KEY_PLACEHOLDER,
  LOCAL_WIX_SECRET_PLACEHOLDER,
  bootstrapWixLocalEnv,
} from "./wix-local-env.mjs";

describe("bootstrapWixLocalEnv", () => {
  it("falls back to wix.config.json appId and disables auth placeholders for local flows", () => {
    const env = {};
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "wix-local-env-"));

    fs.writeFileSync(
      path.join(rootDir, "wix.config.json"),
      JSON.stringify({ appId: "03fdb710-bacd-4968-8faa-539bf91276ef" }),
    );

    const result = bootstrapWixLocalEnv(env, rootDir);

    try {
      expect(result.hasRealWixAuth).toBe(false);
      expect(result.hasWixClientId).toBe(true);
      expect(env).toMatchObject({
        WIX_CLIENT_ID: "03fdb710-bacd-4968-8faa-539bf91276ef",
        WIX_CLIENT_INSTANCE_ID: LOCAL_WIX_INSTANCE_PLACEHOLDER,
        WIX_CLIENT_PUBLIC_KEY: LOCAL_WIX_PUBLIC_KEY_PLACEHOLDER,
        WIX_CLIENT_SECRET: LOCAL_WIX_SECRET_PLACEHOLDER,
      });
    } finally {
      fs.rmSync(rootDir, { recursive: true, force: true });
    }
  });

  it("preserves real Wix auth credentials when they are already present", () => {
    const env = {
      WIX_CLIENT_ID: "real-client-id",
      WIX_CLIENT_INSTANCE_ID: "real-instance-id",
      WIX_CLIENT_PUBLIC_KEY: "real-public-key",
      WIX_CLIENT_SECRET: "real-secret",
    };

    const result = bootstrapWixLocalEnv(env, process.cwd());

    expect(result.hasRealWixAuth).toBe(true);
    expect(env).toMatchObject({
      WIX_CLIENT_ID: "real-client-id",
      WIX_CLIENT_INSTANCE_ID: "real-instance-id",
      WIX_CLIENT_PUBLIC_KEY: "real-public-key",
      WIX_CLIENT_SECRET: "real-secret",
    });
  });
});
