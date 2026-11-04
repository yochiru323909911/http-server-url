const path = require("node:path");
const http = require("node:http");
const { fork } = require("node:child_process");

const ROOT = path.join(__dirname, "..");
const PRELOAD = path.join(__dirname, "preload.cjs");

/**
 * Runs a student server file (e.g. "ex1.js") in its own process, exactly like `node ex1.js`,
 * and waits until it calls server.listen(...).
 * Everything the server prints (console.log / console.error) is captured, so the tests can check it.
 *
 * Returns { request, output, waitForOutput, stop }.
 */
function startServer(file, { timeout = 5000 } = {}) {
  const child = fork(path.join(ROOT, file), [], {
    cwd: ROOT,
    execArgv: ["--require", PRELOAD],
    stdio: ["ignore", "pipe", "pipe", "ipc"],
  });

  let printed = "";
  child.stdout.setEncoding("utf8").on("data", (chunk) => (printed += chunk));
  child.stderr.setEncoding("utf8").on("data", (chunk) => (printed += chunk));

  const output = () => printed;
  const outputLines = () => printed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const stop = () => {
    if (child.exitCode === null && !child.killed) child.kill();
  };

  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      stop();
      reject(new Error(`${file} did not start a server within ${timeout / 1000}s - did you call server.listen(3000)?`));
    }, timeout);

    child.on("message", (msg) => {
      if (msg && msg.type === "listening") {
        clearTimeout(timer);
        resolve(msg.port);
      }
    });

    child.on("exit", () => {
      clearTimeout(timer);
      const crash = printed.trim() ? `\n--- ${file} printed ---\n${printed.trim().split(/\r?\n/).filter((line) => !/^\s+at /.test(line)).slice(0, 12).join("\n")}` : "";
      if (/Error/.test(printed)) {
        reject(new Error(`${file} crashed while starting:${crash}`));
      } else {
        reject(new Error(`${file} finished without starting a server - create it with http.createServer(...) and call server.listen(3000)${crash}`));
      }
    });
  });

  ready.catch(() => {}); // the error is reported by request()

  // Sends one HTTP request to the student's server and returns { status, headers, body }.
  async function request(method, urlPath = "/", { headers = {}, body } = {}) {
    const port = await ready;
    return new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: "localhost", port, method, path: urlPath, headers },
        (res) => {
          let data = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
        }
      );
      req.setTimeout(3000, () => {
        req.destroy(new Error(`the server did not answer ${method} ${urlPath} within 3s - did you call res.end(...)?`));
      });
      req.on("error", (err) =>
        reject(err.message.includes("did not answer") ? err : new Error(`request ${method} ${urlPath} failed: ${err.message}${printedNote()}`))
      );
      if (body !== undefined) req.write(body);
      req.end();
    });
  }

  function printedNote() {
    return printed.trim() ? `\n--- the server printed ---\n${printed.trim()}` : "";
  }

  // Waits (up to 1.5s) until check(linesPrinted) returns true.
  async function waitForOutput(check, waitMs = 1500) {
    const start = Date.now();
    while (Date.now() - start < waitMs) {
      if (check(outputLines())) return true;
      await new Promise((r) => setTimeout(r, 25));
    }
    return check(outputLines());
  }

  return { ready, request, output, outputLines, waitForOutput, stop };
}

module.exports = { startServer };
