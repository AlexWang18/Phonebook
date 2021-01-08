const homeRouter = require('express').Router()
const Person = require('../model/person.js')

const logger = require('../utils/logger')

homeRouter.get('/i(nfo)?(moration)?', (req, res) => {
    let len = 0
    Person.find({}, (err, result) => {
        if(err) logger.error(err)
        len = result.length
    })
        .then(persons => {
            res.send(`<div> <p>Phonebook has info for ${len} people</p><p> ${new Date().toLocaleString()}</p> </div>`)
        })
})
//can add properties / functions to exports object like exports.homeRouter = '''
module.exports = homeRouter