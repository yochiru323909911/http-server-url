// Exercise 7: Log Request Method, URL, and HTTP Version
// Create a server on port 3000. For each request, print in the terminal (console.log):
//   Method: GET
//   URL: /login?x=1
//   HTTP Version: 1.1
// Use: req.method, req.url, req.httpVersion
// Don't forget to answer the request too (res.end(...)), so the browser doesn't keep waiting.
//
// Run: node ex7.js   open http://localhost:3000/login?x=1   and look at the terminal

const http = require("http");

// write your code here
