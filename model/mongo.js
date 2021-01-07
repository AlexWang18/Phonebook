require('dotenv').config()

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(suc => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting ', error.message)
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

module.exports = mongoose.model('Person', personSchema) //return constructer function in that any instance of a model will have properties of the model and methods to save/find


