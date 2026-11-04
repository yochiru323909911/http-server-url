const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

// These tests read what the server prints in the terminal (console.log), like you see it when you run: node ex7.js

async function sendAndCheckLog(server, method, path, patterns, what) {
  await server.ready;
  server.request(method, path).catch(() => {}); // the answer is checked in a separate test
  const ok = await server.waitForOutput((lines) => patterns.every((p) => lines.some((line) => p.test(line))));
  if (!ok) {
    const missing = patterns.filter((p) => !server.outputLines().some((line) => p.test(line)));
    assert.fail(
      `after a ${method} ${path} request the server should print ${what}.\n` +
        `missing: ${missing.map(String).join(", ")}\n--- the server printed ---\n${server.output().trim() || "(nothing)"}`
    );
  }
}

test("Exercise 7: logs the method of each request (Method: GET)", async (t) => {
  const server = startServer("ex7.js");
  t.after(server.stop);
  await sendAndCheckLog(server, "GET", "/login?x=1", [/Method:\s*GET\b/i], "Method: GET (use req.method)");
});

test("Exercise 7: logs the request URL (URL: /login?x=1)", async (t) => {
  const server = startServer("ex7.js");
  t.after(server.stop);
  await sendAndCheckLog(server, "GET", "/login?x=1", [/URL:\s*\/login\?x=1\b/i], "URL: /login?x=1 (use req.url)");
});

test("Exercise 7: logs the HTTP version (HTTP Version: 1.1)", async (t) => {
  const server = startServer("ex7.js");
  t.after(server.stop);
  await sendAndCheckLog(server, "GET", "/", [/HTTP Version:\s*1\.1\b/i], "HTTP Version: 1.1 (use req.httpVersion)");
});

test("Exercise 7: logs the real values of every request (POST /api/users)", async (t) => {
  const server = startServer("ex7.js");
  t.after(server.stop);
  await sendAndCheckLog(server, "POST", "/api/users", [/Method:\s*POST\b/i, /URL:\s*\/api\/users\b/i], "Method: POST and URL: /api/users");
});

test("Exercise 7: the server still answers every request (res.end)", async (t) => {
  const server = startServer("ex7.js");
  t.after(server.stop);
  const res = await server.request("GET", "/login?x=1");
  assert.ok(res.status < 500, "the request should get a normal answer - finish with res.end(...)");
});
