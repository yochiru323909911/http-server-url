const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

const JSON_HEADERS = { "content-type": "application/json" };

test("Exercise 8: POST with Content-Type application/json answers 'JSON accepted'", async (t) => {
  const server = startServer("ex8.js");
  t.after(server.stop);
  const res = await server.request("POST", "/", { headers: JSON_HEADERS, body: '{"name":"Dana"}' });
  assert.equal(res.body.trim(), "JSON accepted", "POST + Content-Type: application/json should answer exactly: JSON accepted");
});

test("Exercise 8: POST with another Content-Type answers 'Unsupported request'", async (t) => {
  const server = startServer("ex8.js");
  t.after(server.stop);
  const res = await server.request("POST", "/", { headers: { "content-type": "text/plain" }, body: "hello" });
  assert.equal(res.body.trim(), "Unsupported request", "POST + Content-Type: text/plain should answer: Unsupported request");
});

test("Exercise 8: GET answers 'Unsupported request' (even with application/json)", async (t) => {
  const server = startServer("ex8.js");
  t.after(server.stop);
  let res = await server.request("GET", "/", { headers: JSON_HEADERS });
  assert.equal(res.body.trim(), "Unsupported request", "GET + Content-Type: application/json should answer: Unsupported request - the method must be POST");
  res = await server.request("GET", "/");
  assert.equal(res.body.trim(), "Unsupported request", "GET without headers should answer: Unsupported request");
});
