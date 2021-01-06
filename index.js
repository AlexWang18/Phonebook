//getting bug where it is taking forever to loadpage

const morgan = require('morgan')
const cors = require('cors')
const express = require('express')

const app = express()


app.use(cors()) //i hate life
app.use(express.json())  //transforms json into a JS object that is attached to body of the request b4 route handler is called, "middleware" in that it handles req, res objects
app.use(express.static('build'))

app.use(morgan(':method :url :status res[content-length] - :response-time ms :content', {
    skip: (req, res) => req.method !== 'POST'
}))
morgan.token('content', (req, res) => {
    return req.body.name + " " + req.body.number
})

const Person = require('./model/mongo')
const { response } = require('express')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(results => {
        res.json(results)
    })
})

app.get('/api/persons/:id', (req, res) => {
    console.log(typeof req.params.id)
    Person.findById(req.params.id).then(person => {
        if (person !== null)
            res.json(person)
        res.json({
            error: "id does not exist"
        }).status(404)
    }).catch(err => console.log(err.message))

})

app.delete('/api/persons/:id', (req, res) => {

    Person.findByIdAndDelete(req.params.id, (err) => {
        if (err) console.log(err)
        console.log('successful deletion')
    })
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body)
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'missing name or number',
            code: '400'
        })
    }
    //pass a filter object to find, returns a query - then is passed to callback parameter
    Person.find({ $or: [{ name: body.name }, { number: body.number }] }, (err, result) => {
        //if(err) 
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
let len = 0 
Person.find({}, (err, result) => {
    //if(err)
    len = result.length
})

app.get('/info', (req, res) => {
    res.send(`<div> <p>Phonebook has info for ${len} people</p><p> ${new Date()}</p> </div>`);
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


//console.log(persons) this would run before any of the route handlers or server creation>