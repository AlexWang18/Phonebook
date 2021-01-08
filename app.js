const express = require('express')
const app = express()

const cors = require('cors')
const personRouter = require('./controllers/people')
const homeRouter = require('./controllers/home')

const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('build')) //could try using path.join(___dirname, 'public') to try and get the build production of react frontend
app.use(express.json())  //transforms json into a JS object that is attached to body of the request b4 route handler is called, middleware in that it handles req, res objects


app.use(middleware.morganLogger) //not working

app.use('/', homeRouter)
app.use('(/api)?/persons', personRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app




//console.log(persons) this would run before any of the route handlers or server creation>