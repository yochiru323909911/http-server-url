const { test } = require("node:test");
const { run, runWithOtherUrl, assertPrinted } = require("./script-helpers");

const URL_FROM_EXERCISE = "http://localhost:3000/users/list?role=admin&active=true#top";

test("Exercise 4: prints hostname, pathname, protocol, query and hash", () => {
  assertPrinted(run("ex4.js"), [
    "Hostname: localhost",
    "Pathname: /users/list",
    "Protocol: http:",
    "Query: ?role=admin&active=true",
    "Hash: #top",
  ]);
});

test("Exercise 4: the parts come from the URL object (works for another URL too)", () => {
  const lines = runWithOtherUrl("ex4.js", URL_FROM_EXERCISE, "https://shop.example.com:8080/cart/items?id=7#reviews");
  assertPrinted(
    lines,
    ["Hostname: shop.example.com", "Pathname: /cart/items", "Protocol: https:", "Query: ?id=7", "Hash: #reviews"],
    " when the URL is https://shop.example.com:8080/cart/items?id=7#reviews - use new URL(urlStr) and its properties"
  );
});
