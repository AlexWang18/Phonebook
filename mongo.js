require('dotenv').config()

const url = process.env.MONGODDB_URI

const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: 'String',
    number: 'String'
})

module.exports = mongoose.model('Person', personSchema) //return constructer function in that any instance of a model will have properties of the model and methods to save/find

const printAll = () => {
    Person.find({}).then(persons => {
        if(persons.length === 0){
            console.log('no data yet')
            return;
        }
        console.log('phonebook:')
        persons.forEach(p => {
            console.log(p.name + ' ' + p.number)
        })
        mongoose.connection.close()
    })
}

const addPerson = () => {
    const passed = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    passed.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}
if (process.argv.length < 4) {
    printAll()
}
else {
    addPerson()
}


