const router = require('express').Router()
const Person = require('../model/person') //import our ORM to fetch from the Mongo DB

const logger = require('../utils/logger')

router.get('/', (req, res, next) => {
    Person.find({})
        .then(results => {
            res.json(results)
        })
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {

    Person.findById(req.params.id).then(person => {
        if (person !== null)
            res.json(person)
        else
            res.json({
                error: 'id does not exist'
            }).status(404)
    }).catch(err => next(err))

})

router.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'missing name',
            code: '400'
        })
    }
    else if (!body.number) {
        return res.status(400).json({
            error: 'missing number',
            code: '400'
        })
    }
    //pass a filter object to find, returns a query - then is passed to callback parameter
    Person.find({ $or: [{ name: body.name }, { number: body.number }] }, (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.length !== 0) {
            return res.status(400).json({
                error: 'duplicate name or number, must be unique',
            })
        }
        else {
            Person.create({ ...body }).then(savedPerson => {
                logger.info(`added ${savedPerson.name} to phonebook`)
                return res.json(savedPerson)
            })
                .catch(error => next(error))
        }
    })

})

router.delete('/:id', (req, res, next) => {

    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            logger.info('deleted ', result.name)
            if (result === null) {
                return res.status(404).json({ error: 'nonexistent person' })
            }
            res.status(204).end()
        })
        .catch(err => next(err))

})

router.put('/:id', (req, res, next) => {
    const body = req.body
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



router.get('/i(nfo)?(moration)?', (req, res) => {
    let len = 0
    Person.find({}, (err, result) => {
        if (err) logger.error(err)
        len = result.length
    })
        .then(persons => {
            res.send(`<div> <p>Phonebook has info for ${len} people</p><p> ${new Date().toLocaleString()}</p> </div>`)
        })
})

module.exports = router