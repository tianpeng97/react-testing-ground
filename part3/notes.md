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

# Express app

- import express to use as function for server
- define routes for HTTP GET requests
- get('/') is GET request to '/' route
- we use the send method of response object to send a string back to browser and since it's a string, express
  autosets Content-Type header to text/html, defaults also status to 200
- JSON formatted string is autochanged to application/json

# Distincting between data object and JSON

- JSON is a string of the data with a specified data format
- data object would be the array of objects set to notes

# Nodemon

- nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application
