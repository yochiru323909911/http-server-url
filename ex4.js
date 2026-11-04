// Exercise 4: Parse and Log URL Parts
// Print the following parts of the URL:
//   Hostname: localhost
//   Pathname: /users/list
//   Protocol: http:
//   Query: ?role=admin&active=true
//   Hash: #top
//
// Run: node ex4.js

const { URL } = require("url");

const urlStr = 'http://localhost:3000/users/list?role=admin&active=true#top';

// write your code here

const url = new URL(urlStr);

console.log(`Hostname: ${url.hostname}`);
console.log(`Pathname: ${url.pathname}`);
console.log(`Protocol: ${url.protocol}`);
console.log(`Query: ${url.search}`);
console.log(`Hash: ${url.hash}`);