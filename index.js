
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')

const app = express()


app.use(cors()) 
app.use(express.json())  //transforms json into a JS object that is attached to body of the request b4 route handler is called, middleware in that it handles req, res objects
app.use(express.static('build'))

app.use(morgan(':method :url :status res[content-length] - :response-time ms :content', {
    skip: (req, res) => req.method !== 'POST' || req.method !== 'PUT' || req.method !== 'DELETE'
}))
morgan.token('content', (req, res) => {
    return req.body.name + " " + req.body.number
})

const Person = require('./model/mongo') //import our model document to fetch from Mongo DB

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(results => {
            res.json(results)
        })
        .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        if (person !== null)
            res.json(person)
        else
            res.json({
                error: "id does not exist"
            }).status(404)
    }).catch(err => next(err))

})

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'missing name or number',
            code: '400'
        })
    }
    //pass a filter object to find, returns a query - then is passed to callback parameter
    Person.find({ $or: [{ name: body.name }, { number: body.number }] }, (err, result) => {
        if(err) next(err)
        if (result.length !== 0) {
            return res.status(400).json({
                error: 'duplicate name or number, must be unique',
            })
        }
        else {
            Person.create({ ...body }).then(savedPerson => {
                console.log(`added ${savedPerson.name} to phonebook`)
                return res.json(savedPerson)
            })
        }
    })

})

app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log(result)
            if (result === null) {
                return res.status(404).json({ error: 'nonexistent person' })
            }
            res.status(204).end()
        })
        .catch(err => next(err))

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    //console.log(req)
    const person = {
        name: body.name,
        number: body.number
    }
    
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})



app.get('/info', (req, res) => {
    let len = 0
    Person.find({}, (err, result) => {
        //if(err)
        len = result.length
    })
    .then(persons => {
        res.send(`<div> <p>Phonebook has info for ${len} people</p><p> ${new Date().toLocaleString()}</p> </div>`);
    })
    
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'incorrectly formatted id' })
    }

    next(err)
}

app.use(errorHandler)
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//console.log(persons) this would run before any of the route handlers or server creation>