const { test } = require("node:test");
const { run, runWithOtherUrl, assertPrinted } = require("./script-helpers");

const URL_FROM_EXERCISE = "https://app.com/search?query=node&sort=asc";

test("Exercise 6: prints the final URL https://app.com/search?sort=desc&page=3", () => {
  assertPrinted(run("ex6.js"), ["https://app.com/search?sort=desc&page=3"], " - print url.href (or url.toString())");
});

test("Exercise 6: set / append / delete really change the URL (works for another URL too)", () => {
  const lines = runWithOtherUrl("ex6.js", URL_FROM_EXERCISE, "https://app.com/search?query=express&sort=asc&limit=5");
  assertPrinted(
    lines,
    ["https://app.com/search?sort=desc&limit=5&page=3"],
    " when the URL is https://app.com/search?query=express&sort=asc&limit=5 - use searchParams.set / append / delete"
  );
});
