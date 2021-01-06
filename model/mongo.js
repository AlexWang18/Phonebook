require('dotenv').config()

const url = process.env.MONGODB_URI

const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(suc => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting ', error.message)
})

const personSchema = new mongoose.Schema({
    name: 'String',
    number: 'String'
})

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj._id = returnedObj._id.toString()
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema) //return constructer function in that any instance of a model will have properties of the model and methods to save/find


