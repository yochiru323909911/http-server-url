const { test } = require("node:test");
const { run, runWithOtherUrl, assertPrinted } = require("./script-helpers");

const URL_FROM_EXERCISE = "https://site.com/products?id=15&type=book&lang=en";

test("Exercise 5: prints the id, type and lang query parameters", () => {
  assertPrinted(run("ex5.js"), ["ID: 15", "Type: book", "Language: en"]);
});

test("Exercise 5: the values come from searchParams.get() (works for another URL too)", () => {
  const lines = runWithOtherUrl("ex5.js", URL_FROM_EXERCISE, "https://site.com/products?lang=he&id=42&extra=1&type=movie");
  assertPrinted(
    lines,
    ["ID: 42", "Type: movie", "Language: he"],
    " when the URL is https://site.com/products?lang=he&id=42&extra=1&type=movie - use url.searchParams.get(...)"
  );
});
