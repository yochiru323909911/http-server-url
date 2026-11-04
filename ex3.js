// Exercise 3: Return the request headers
// Goal: return all the request headers back to the client as a JSON string.
//
// Run: node ex3.js   and open http://localhost:3000

const http = require("http");

// write your code here

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.headers));
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));