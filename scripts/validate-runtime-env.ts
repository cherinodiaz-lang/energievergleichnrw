#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  REQUIRED_WIX_RUNTIME_ENV_KEYS,
  buildMissingWixRuntimeEnvMessage,
} from "../src/lib/runtime-env-guard";

type EnvMap = Record<string, string>;

function parseEnvFile(filePath: string): EnvMap {
  if (!existsSync(filePath)) {
    return {};
  }

  const parsed: EnvMap = {};
  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    parsed[key] = value;
  }

  return parsed;
}

function hasValue(input: unknown): boolean {
  return typeof input === "string" && input.trim().length > 0;
}

function collectEffectiveEnv(): EnvMap {
  const cwd = process.cwd();
  const fromEnvLocal = parseEnvFile(resolve(cwd, ".env.local"));
  const fromDevVars = parseEnvFile(resolve(cwd, ".dev.vars"));
  const fromProcess = process.env as EnvMap;

  return {
    ...fromEnvLocal,
    ...fromDevVars,
    ...fromProcess,
  };
}

const env = collectEffectiveEnv();
const missingKeys = REQUIRED_WIX_RUNTIME_ENV_KEYS.filter((key) => !hasValue(env[key]));

if (missingKeys.length > 0) {
  console.error(`FAIL: ${buildMissingWixRuntimeEnvMessage(missingKeys)}`);
  console.error(
    "Checked sources: process.env, .env.local, .dev.vars",
  );
  process.exit(1);
}

console.log(
  `PASS: Runtime env validation passed (${REQUIRED_WIX_RUNTIME_ENV_KEYS.length} required keys found).`,
);
