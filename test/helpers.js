const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const ROOT = path.join(__dirname, "..");

// Loads a student module fresh (no cache), so every test starts clean.
function load(relativePath) {
  const full = path.join(ROOT, relativePath);
  try {
    delete require.cache[require.resolve(full)];
    return require(full);
  } catch (err) {
    throw new Error(`could not load ${relativePath}: ${err.message}`);
  }
}

// Runs fn and returns everything it printed with console.log, one string per call.
function captureConsole(fn) {
  const lines = [];
  const original = console.log;
  console.log = (...args) => lines.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
  try {
    fn();
  } finally {
    console.log = original;
  }
  return lines;
}

// Runs a student file with node, feeds it stdin, and returns its output lines (for CLI / prompt programs).
function runScript(relativePath, input = "", { timeout = 5000 } = {}) {
  const result = spawnSync(process.execPath, [path.join(ROOT, relativePath)], {
    cwd: ROOT,
    input,
    encoding: "utf8",
    timeout,
  });
  if (result.error?.code === "ETIMEDOUT") {
    throw new Error(`${relativePath} did not finish within ${timeout / 1000}s - is it waiting for more input or stuck in a loop?`);
  }
  return {
    code: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    lines: result.stdout.split(/\r?\n/).filter((line) => line.trim() !== ""),
  };
}

// Returns a student file's source without comments (to check "twist" rules such as "don't use .filter()").
function sourceOf(relativePath) {
  const text = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

module.exports = { load, captureConsole, runScript, sourceOf };
