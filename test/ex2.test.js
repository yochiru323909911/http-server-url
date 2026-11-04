const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

test("Exercise 2: GET answers 'You used method: GET'", async (t) => {
  const server = startServer("ex2.js");
  t.after(server.stop);
  const res = await server.request("GET", "/");
  assert.equal(res.body.trim(), "You used method: GET", "a GET request should answer exactly: You used method: GET");
});

test("Exercise 2: the answer uses the real method (POST, PUT, DELETE)", async (t) => {
  const server = startServer("ex2.js");
  t.after(server.stop);
  for (const method of ["POST", "PUT", "DELETE"]) {
    const res = await server.request(method, "/");
    assert.equal(res.body.trim(), `You used method: ${method}`, `a ${method} request should answer: You used method: ${method} - use req.method`);
  }
});
