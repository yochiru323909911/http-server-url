// Exercise 2: Return the request method
// Goal: the server answers with the method used in the request.
// Example: if the method is GET, answer "You used method: GET"
//
// Run: node ex2.js   and open http://localhost:3000

const http = require("http");

// write your code here

const server = http.createServer((req, res) => {
  res.end(`You used method: ${req.method}`);
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));