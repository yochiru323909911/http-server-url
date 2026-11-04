const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

test("Exercise 9: GET /hello answers 'Hello from GET'", async (t) => {
  const server = startServer("ex9.js");
  t.after(server.stop);
  const res = await server.request("GET", "/hello");
  assert.equal(res.body.trim(), "Hello from GET", "GET /hello should answer exactly: Hello from GET");
});

test("Exercise 9: POST /hello answers 'Hello from POST'", async (t) => {
  const server = startServer("ex9.js");
  t.after(server.stop);
  const res = await server.request("POST", "/hello");
  assert.equal(res.body.trim(), "Hello from POST", "POST /hello should answer exactly: Hello from POST");
});

test("Exercise 9: anything else answers 'Not supported'", async (t) => {
  const server = startServer("ex9.js");
  t.after(server.stop);
  for (const [method, path] of [["GET", "/"], ["GET", "/bye"], ["POST", "/users"], ["PUT", "/hello"], ["DELETE", "/hello"]]) {
    const res = await server.request(method, path);
    assert.equal(res.body.trim(), "Not supported", `${method} ${path} should answer: Not supported`);
  }
});
