// Exercise 1: Return a fixed text
// Goal: create a server that always answers:
//   Hello from Node Server!
// regardless of the request (any path, any method).
//
// Run: node ex1.js   and open http://localhost:3000

const http = require("http");

// write your code here (create the server and call server.listen(3000))

const server = http.createServer((req, res) => {
  res.end("Hello from Node Server!");
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));