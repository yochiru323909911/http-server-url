// Exercise 9: Manual Route Handling with Method Check
// GET  /hello   -> answer "Hello from GET"
// POST /hello   -> answer "Hello from POST"
// Anything else -> answer "Not supported"
// Use only: req.url, req.method
//
// Run: node ex9.js   (test it with the browser and Postman / Thunder Client)

const http = require("http");

// write your code here

const server = http.createServer((req, res) => {
  if (req.url === "/hello" && req.method === "GET") {
    res.end("Hello from GET");
  } else if (req.url === "/hello" && req.method === "POST") {
    res.end("Hello from POST");
  } else {
    res.end("Not supported");
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));