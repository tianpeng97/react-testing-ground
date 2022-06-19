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

# Same origin policy and CORS

- default: js code of application allows communication of same origin, so 3000 !== 3001
- need to use Node's cors middleware in backend

# Running production build

- build contains directory static, which is a minified version of our js code
- everything will be compressed into 1 file, including dependencies
- we should copy build directory to root of backend and configure it so it shows
  build/index.html as main page (frontend)
- Express shows static content (index.html and JS) it fetches with middleware "static('build')"
  where it will check build directory after every HTTP GET request for route so it can return it
  before checking backend routes
- since backend and frontend same address, we can use relative URL / as baseURL

# Streamlining deploying of the frontend

- create scripts to build frontend and redeploy on heroku

# Proxies

- add proxies to frontend repo so in dev it redirects calls from 3000->3001, since frontend doesnt manage any routes except /

# MongoDB: document database

- why? lower complexity compared to relational databases
- database stores collections of BSON documents
- BSON is binary JSON documents
- reminder that JSON is plain text format for expressing structured data for many languages
- use Mongoose as Object Document Mapper so Js object => Mongo documents is easy

# Schema and its matching model

- schema are the start.
- they map themselves to a Mongo collection and defines the shape that documents can hold within that collection
- Models are fancy constructors compiled from Schemas, where an instance of a model is a document. models create and read documents from a database. THEY DO THE CRUD OPS in a database
- const Note = mongoose.model('Note', schema) where
  Note variable is used for CRUD and model definition for instanciation
- Note is singular name of model, mongoose transforms it so collection is named plural (notes).
- MONGO SCHEMALESS, documents can have different fields in same collection, but mongoose gives it a schema at the level of the app

# CRUD

- create:note = new Note({object}), note.save().then(resulte => {}), mongoose.connection.close()
- read: Note.find({}) to retrieve objects with conditions and returns a promise to treat with handler. note that this returns NULL and not an error if nothing found. can also findById()
- update: findByIdAndUpdate(id, JS object, {new: true}) where the new:true means the handler is passed updated note and NOT the original
- delete: findByIdAndRemove (NOT DELETE)

# Mongoose formatting (format only for frontend)

- We can format the objects returned by mongoose by creating toJSON method, used on all instances of the models produced with that schema
- JSON.stringify will call toJSON method on all objects
- response will give out JSON formatted

```
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
```

# Models directory

- mongoose logic, so module.exports = Note model for note.js

# Status codes:

- 204 no content (after deletion)
- 400 bad request (do not repeat request either cuz syntax eror or else)
- 404 not found
- 500 internal server error

# Error handling:

- handler of request promise has 3 args (request, response, next) where next(error) moves execution to error handler middleware
- express error handlers are middleware that take 4 params (error, request, response, next)

```
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

// last loaded middleware
app.use(errorHandler)
```

# Order of middleware!!!

1. cors
2. static build
3. json-parser or any parser
4. requestLogger such as morgan
5. define routes
6. unknown endpoints (req,res) handler
7. error handler (error, req, res, next)

# Data validation in Mongoose

- in the schema define object {type, minLength, required} for each field
- can create custom validators (like minLength and required)
- `error.name = ValidationError`
- also `CastError` if malformatted ID
- validations DO NOT WORK WITH `findOneAndUpdate` and all `find+update`
- solution: add `runValidators:true` property to options, also `context:'query'`
- Validation error in backend json sends `error:'message'`, can pick up in frontend with error.`response.data.error`
