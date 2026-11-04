const { test } = require("node:test");
const assert = require("node:assert/strict");
const { startServer } = require("./server-helpers");

function parseJson(body) {
  try {
    return JSON.parse(body);
  } catch {
    assert.fail(`the answer should be a JSON string (use JSON.stringify(req.headers)), but got: ${body.slice(0, 120) || "(empty)"}`);
  }
}

test("Exercise 3: answers with the request headers as a JSON string", async (t) => {
  const server = startServer("ex3.js");
  t.after(server.stop);
  const res = await server.request("GET", "/", { headers: { "x-course": "fullstack" } });
  const headers = parseJson(res.body);
  assert.equal(typeof headers, "object", "the JSON should be an object of headers");
  assert.ok(headers.host, "the JSON should include the host header - return req.headers");
  assert.equal(headers["x-course"], "fullstack", "the header x-course: fullstack that was sent should come back in the JSON");
});

test("Exercise 3: returns the headers of each request (not fixed headers)", async (t) => {
  const server = startServer("ex3.js");
  t.after(server.stop);
  const res = await server.request("POST", "/data", { headers: { "x-student": "dana", "content-type": "text/plain" } });
  const headers = parseJson(res.body);
  assert.equal(headers["x-student"], "dana", "the header x-student: dana should come back in the JSON");
  assert.equal(headers["content-type"], "text/plain", "the header content-type: text/plain should come back in the JSON");
  assert.equal(headers["x-course"], undefined, "a header that was not sent in this request should not be in the JSON");
});
