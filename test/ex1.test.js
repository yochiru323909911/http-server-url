const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

const TEXT = "Hello from Node Server!";

test("Exercise 1: GET / answers 'Hello from Node Server!'", async (t) => {
  const server = startServer("ex1.js");
  t.after(server.stop);
  const res = await server.request("GET", "/");
  assert.equal(res.body.trim(), TEXT, `GET / should answer exactly: ${TEXT}`);
});

test("Exercise 1: every request gets the same text (any path, any method)", async (t) => {
  const server = startServer("ex1.js");
  t.after(server.stop);
  for (const [method, path] of [["GET", "/users/5"], ["POST", "/login"], ["DELETE", "/anything?x=1"]]) {
    const res = await server.request(method, path);
    assert.equal(res.body.trim(), TEXT, `${method} ${path} should also answer: ${TEXT} (regardless of the request)`);
  }
});
