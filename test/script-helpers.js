const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { runScript } = require("./helpers");

const ROOT = path.join(__dirname, "..");

// Runs a student script (node exN.js) and returns the lines it printed. Fails clearly if it crashed.
function run(file) {
  const result = runScript(file);
  if (result.code !== 0) {
    assert.fail(`${file} crashed:\n${result.stderr.trim().split(/\r?\n/).slice(0, 8).join("\n")}`);
  }
  return result.lines.map((line) => line.trim());
}

// Runs the student script again with a different URL instead of the one from the exercise,
// to make sure the output really comes from parsing the URL and is not written by hand.
function runWithOtherUrl(file, originalUrl, otherUrl) {
  const source = fs.readFileSync(path.join(ROOT, file), "utf8");
  assert.ok(
    source.includes(originalUrl),
    `keep the URL from the exercise in your code exactly as given: '${originalUrl}'`
  );
  const tmpName = `.tmp-check-${path.basename(file)}`;
  const tmpPath = path.join(ROOT, tmpName);
  fs.writeFileSync(tmpPath, source.split(originalUrl).join(otherUrl));
  try {
    return run(tmpName);
  } finally {
    fs.rmSync(tmpPath, { force: true });
  }
}

// Asserts that every expected line was printed (extra lines are fine).
function assertPrinted(lines, expected, hint = "") {
  for (const line of expected) {
    assert.ok(
      lines.includes(line),
      `expected the line "${line}" to be printed${hint}.\n--- printed ---\n${lines.join("\n") || "(nothing)"}`
    );
  }
}

module.exports = { run, runWithOtherUrl, assertPrinted };
