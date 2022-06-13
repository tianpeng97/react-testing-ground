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
- use colon, like notes/:id for defining parameters, and we can access id in request object, like request.params.id
- like with promises, need a way to treat 200 and 404 (response.status(404).end()) requests
- .status() is used for settings status
- .end() used for response without sending data
- .statusMessage = "message" with 404 status (message IN status, not displayed)
- status 204 no content if returns no data to response
- app.use(express.json()) to use json-parser, which takes JSON request, transforms it to JS object then attaches it to body of request before sending
- status 400 is for BAD requests (if for example body has bad content, like no empty values)
- for the above and ALWAYS REMEMBER, inside handler, RETURN WILL END EXECUTION
- res.json will JSON.stringify response, but u can also res.send('<html/>')

# Distincting between data object and JSON

- JSON is a string of the data with a specified data format
- data object would be the array of objects set to notes

# Nodemon

- nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application

# RESTful HTTP API, similar to json-server, and how it's understood in web apps

1. singular things, like notes, are resources with its own URL
2. URL created with name of resource type and ID, like for example /notes/10
3. URL for entire COLLECTION of all note resources is /notes
4. we can execute different operations on resources:
5. interface intended for programmer use

- GET: fetches a single resource (notes/10)
- GET: fetches all resources in collection (notes)
- POST: creates a new resource based on the request data (notes)
- DELETE: removes resource (notes/10)
- PUT: replaces entire resource with request data (notes/10)
- PATCH: replaces entire part of resource with request data (notes/10)

# HTTP Request Types Standard: Safety and Idempotence

- Adheres to RESTful principles!
- Safety: Database should remain unchanged. Get should only retrieve. Response returns existing data.
- Idempotence: if a request has side-effects (like affects DB), then the result is same regardless of how many times the request is sent
- GET: safe
- HEAD: safe: Like GET but only returns status code and response headers, so no body.
- GET, HEAD, PUT, DELETE except POST: should be IDEMPOTENT
- POST: NOT SAFE AND NOT IDEMPOTENT

# Middleware

- express json-parser (always first middleware, also before routes)
- functions used to handle request and response objects
- can have multiple middlewares in order
- for requests: takes raw data from request object, parses it into javascript object and assigns it to body
- for responses:
- middleware is a function that takes 3 parameters (request, response, next) = requestLogger
- next() yields control to next middleware
- app.use(requestLogger)
- like prev said, define before routes to handle parse routes, else after for non-existent routes
- unknownEndpoint = (request, response) => {
  response.status(404).json({error: 'unknown endpoint'})
  }
