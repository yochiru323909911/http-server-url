# Exercise 7 - Basic Node.js Server & the URL Module 🌐

Nine short Node.js exercises, without Express:

| Part | Exercises | Topic |
|---|---|---|
| A - Base server | 1-3 | An `http` server that returns text, the request method and the request headers |
| B - URL Module | 4-6 | Parsing a URL, reading query parameters and changing them |
| C - Vanilla server | 7-9 | Logging request details in the terminal, responding by method + header, manual routing |

## Getting started

1. Click **Use this template** → **Create a new repository** at the top of this page to create your own repo.
2. `git clone` your new repo and open it in VS Code.
3. In the terminal, run once: `npm install` (Node 20 or newer is required - check with `node -v`).
4. Write your code in the files `ex1.js` to `ex9.js`. Each file is a separate program, and the task is written at the top of each file.

### How to run an exercise

```bash
node ex1.js
```

- **Server exercises (1-3, 7-9):** the server listens on port `3000`. Open `http://localhost:3000` in the browser. Send `POST` / `PUT` / `DELETE` requests and requests with custom headers using Postman or Thunder Client. Stop the server with `Ctrl + C` before running another exercise.
- **URL exercises (4-6):** the program prints to the terminal and exits.

## How to check your work

```bash
npm test
```

- At first all tests are red (✘). Each test name starts with the number of the exercise it checks.
- The tests run each file exactly like `node exN.js`, send real requests to your server, and check what it answered **and what it printed in the terminal** (`console.log`).
- You don't need to start the server yourself before `npm test`. The tests start it on their own (on a free port, even if port 3000 is busy).
- Under every failing test you'll see what went wrong, and sometimes also what your program actually printed.
- In the URL exercises, the tests also run your code with a **different** URL instead of the one in the exercise, to make sure the output really comes from the URL and is not hard-coded. So keep the URL from the exercise in your code exactly as given.
- When all tests are green (✔) you'll see **✅ the task is APPROVED** and you can move on to the next task.
- After `git push` the tests also run on GitHub (Actions tab). A green check next to the commit = the task is approved.
- To check a single exercise: `node --test test/ex4.test.js`

> Don't change the files in the `test/` folder.

---

## Part A - Base server

In every exercise you create a server with `http.createServer(...)` and start it with `server.listen(3000)`.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("some text");
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

### Exercise 1: Return a fixed text - `ex1.js`
**Goal:** Create a server that always responds with:
`"Hello from Node Server!"`
regardless of the request.

### Exercise 2: Return the request method - `ex2.js`
**Goal:** The server should return the method used in the request.
Example: if the method is GET, respond with `"You used method: GET"`

### Exercise 3: Return the request headers - `ex3.js`
**Goal:** Return all the request headers back to the client as a JSON string.

---

## Part B - URL Module

**How to use:**

```js
const { URL } = require("url");   // or: import { URL } from "url";

const myUrl = new URL('http://localhost:3000/search?term=nodejs&limit=10');
console.log(myUrl.pathname);                  // "/search"
console.log(myUrl.searchParams.get('term'));  // "nodejs"
```

> This project uses `require` (CommonJS), like the previous exercises.

### Exercise 4: Parse and Log URL Parts - `ex4.js`
**Task:** Create a script that receives a URL string and logs the following parts:
- Hostname
- Pathname
- Protocol
- Query string
- Fragment (hash)

**Example URL to use:**
```js
const urlStr = 'http://localhost:3000/users/list?role=admin&active=true#top';
```

**Expected Output:**
```
Hostname: localhost
Pathname: /users/list
Protocol: http:
Query: ?role=admin&active=true
Hash: #top
```

### Exercise 5: Extract Query Parameters - `ex5.js`
**Task:** Given a URL, extract the value of specific query parameters using `.searchParams.get()`:
- Use `https://site.com/products?id=15&type=book&lang=en`
- Extract the values of `id`, `type`, and `lang`
- Print them

**Expected Output:**
```
ID: 15
Type: book
Language: en
```

### Exercise 6: Modify Query Parameters - `ex6.js`
**Task:** Start with this URL:
```js
const urlStr = 'https://app.com/search?query=node&sort=asc';
```
- Change the query parameter `sort` to `'desc'`
- Add a new parameter `page=3`
- Remove `query`
- Print the final URL

**Expected Output:**
```
https://app.com/search?sort=desc&page=3
```

**Hint:** Use `.searchParams.set()`, `.searchParams.append()`, and `.searchParams.delete()`.
To print the URL as text, use `myUrl.href` (or `myUrl.toString()`).

---

## Part C - Vanilla server

### Exercise 7: Log Request Method, URL, and HTTP Version - `ex7.js`
**Task:** Create a server on port 3000. For each request:
- Log the method used (e.g. GET, POST)
- Log the request URL (e.g. /login?x=1)
- Log the HTTP version used (e.g. 1.1, 2.0)

**Use:** `req.method`, `req.url`, `req.httpVersion`

**Expected Example Output** (in the terminal where the server runs, after opening `http://localhost:3000/login?x=1`):
```
Method: GET
URL: /login?x=1
HTTP Version: 1.1
```

Note: besides logging, the server must also **answer** the request (`res.end(...)`), otherwise the browser keeps waiting. The tests check this too.

> The browser sometimes sends an extra request to `/favicon.ico`, so you may see two logs in the terminal. That's fine.

### Exercise 8: Respond Based on Headers and Method - `ex8.js`
**Task:** Create a server that checks:
- If the method is POST
- And the Content-Type header is application/json

Respond with `"JSON accepted"`
Otherwise, respond with `"Unsupported request"`

**Hint:**
- `req.method === 'POST'`
- `req.headers['content-type'] === 'application/json'`

### Exercise 9: Manual Route Handling with Method Check - `ex9.js`
**Task:** Create a simple server that:
- Accepts a GET request to `/hello` → Respond with: `"Hello from GET"`
- Accepts a POST request to `/hello` → Respond with: `"Hello from POST"`
- Anything else → Respond with: `"Not supported"`

**Use only:** `req.url`, `req.method`

---

## Self-check
- [ ] `node ex1.js` → the browser shows `Hello from Node Server!` on every path.
- [ ] `node ex2.js` → in Postman, `POST` returns `You used method: POST`.
- [ ] `node ex3.js` → you see a JSON with the headers your browser sent (`host`, `user-agent`...).
- [ ] `node ex4.js`, `node ex5.js`, `node ex6.js` → the output matches the Expected Output.
- [ ] `node ex7.js` → every browser refresh prints Method, URL and HTTP Version in the terminal.
- [ ] `node ex8.js` → `POST` with `Content-Type: application/json` returns `JSON accepted`, everything else returns `Unsupported request`.
- [ ] `node ex9.js` → `/hello` with GET and with POST answers correctly, everything else returns `Not supported`.
- [ ] `npm test` → **✅ the task is APPROVED**
