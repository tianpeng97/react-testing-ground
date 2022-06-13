# Changing app into web server

- Defining index.js as follow:

```
const http = require('http')

const app = http.createServer((request, response) => {
response.writeHead(200, { 'Content-Type': 'text/plain' })
response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

# What it means?

- Import Node's web server module.
- Browsers use ES6 modules use export/import. Node.js uses CommonJS modules. Node can use ES6 modules, but support is not the best yet.

```
const http = require('http')
// same as importing modules
import http from 'http'
```

- We create a server and an event handler for every server call to localhost:3001
- We also respond with status code, Content-Type header and content

```
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})
```

- We bind a port to the server

```
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

# About dependencies versioning

- Last number is patch
- Middle is minor
- First is major
- ^4.17.2 means versions is AT LEAST 4.17.2, but patch and minor can be larger, major must be same version
- THE ABOVE ALSO MEANS ALL NEWER VERSIONS IS BACKWARDS COMPATIBLE, our code can use 4.99.175, but 5.0.0 may break
- update using "npm update"
