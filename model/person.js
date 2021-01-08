const logger = require('../utils/logger')
const config = require('../utils/config')

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(suc => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: 'String',
        minlength: '1',
        required: true
    },
    
    number: {
        type: 'String',
        minlength: '8',
        required: true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj._id = returnedObj._id.toString() //makes sure it isnt type ObjectId would cause issues in front end, i should have just made another property called id and deleted _id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema) //returns constructer function 


