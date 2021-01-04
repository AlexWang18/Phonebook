let persons = [
    {
        id: 1,
        name: "Alex Wang",
        number: "724-986-8135"
    },
    {
        id: 2,
        name: "Bob Ross",
        number: "489-565-3331"
    },
    {
        id: 3,
        name: "Jim Jones",
        number: "122-773-4532"
    }
]

const express = require('express')
const app = express()

app.use(express.json()) //fix for body undefined, 
//transforms json into a JS object that is attached to body of the request b4 route handler is called

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const note = persons.find(p => p.id === id)
    if (note)
        res.json(note)
    else
        res.status(404).json({
            error: 'invalid id',
            code: 404
        }).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})



function getId() {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
    const num = Math.floor(Math.random() * 77)
    return maxId + num
}
function isError() {

}
app.post('/api/persons', (req, res) => {
    const person = req.body;

    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'missing name or number',
            code: '400'
        })
    }

    if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'duplicate name, must be unique',
        })
    }

    const personObj = {
        id: person.id = getId(), //calculate id serverside
        ...person
    }

    console.log(personObj)
    persons = persons.concat(personObj)
    res.json(personObj)
})

app.get('/info', (req, res) => {
    res.send(`<div> <p>Phonebook has info for ${persons.length} people</p><p> ${new Date()}</p> </div>`);
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


console.log(persons)