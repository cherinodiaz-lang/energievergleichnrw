import { execFileSync, spawn, spawnSync, type ChildProcessWithoutNullStreams } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_BASE_URL = "http://127.0.0.1:4321";
const READY_PATTERN = /Ready on http:\/\/127\.0\.0\.1:4321/;
const NPM_COMMAND = process.platform === "win32" ? "npm.cmd" : "npm";
const LOCAL_ASTRO_BIN = process.platform === "win32" ? "astro.cmd" : "astro";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isReachable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

export function getPreviewPrerequisiteIssue(cwd: string): string | null {
  const astroBinPath = path.join(cwd, "node_modules", ".bin", LOCAL_ASTRO_BIN);

  if (!fs.existsSync(astroBinPath)) {
    return "missing local Astro CLI binary at node_modules/.bin/astro";
  }

  const wixCheck = spawnSync("wix", ["--version"], { stdio: "pipe" });
  if (wixCheck.error || wixCheck.status !== 0) {
    return "wix CLI is not available on PATH (required for npm run build and preview)";
  }

  return null;
}

export function ensurePreviewBuild(cwd: string) {
  execFileSync(NPM_COMMAND, ["run", "build"], {
    cwd,
    stdio: "pipe",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });
}

export async function startPreviewWorker(cwd: string): Promise<{
  baseUrl: string;
  process: ChildProcessWithoutNullStreams;
  stop: () => Promise<void>;
}> {
  const server = spawn(NPM_COMMAND, ["run", "preview:worker"], {
    cwd,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  let ready = false;

  const onData = (chunk: Buffer) => {
    output += chunk.toString("utf8");
    if (READY_PATTERN.test(output)) {
      ready = true;
    }
  };

  server.stdout.on("data", onData);
  server.stderr.on("data", onData);

  const startedAt = Date.now();

  while (!ready && Date.now() - startedAt < 60_000) {
    if (server.exitCode !== null) {
      throw new Error(`Preview worker exited early with code ${server.exitCode}.\n${output}`);
    }

    if (await isReachable(DEFAULT_BASE_URL)) {
      ready = true;
      break;
    }

    await wait(500);
  }

  if (!ready) {
    server.kill("SIGINT");
    throw new Error(`Preview worker did not become ready.\n${output}`);
  }

  return {
    baseUrl: DEFAULT_BASE_URL,
    process: server,
    stop: async () => {
      if (server.exitCode !== null) {
        return;
      }

      server.kill("SIGINT");
      await Promise.race([
        once(server, "exit"),
        wait(5_000).then(() => {
          if (server.exitCode === null) {
            server.kill("SIGKILL");
          }
        }),
      ]);
    },
  };
}
