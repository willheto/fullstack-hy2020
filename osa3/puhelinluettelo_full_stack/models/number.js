require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const loading = ['/', '-', '\\', '|', '/', '-', '\\', '|']
let index = 0;

const url = process.env.MONGODB_URI

const spinLoading = setInterval(() => {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(loading[index] + ' connecting to MongoDB, please wait')
    index++
    if (index == 7) {
        index = 0
    }
}, 250)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        clearInterval(spinLoading)
        console.log('')
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        clearInterval(spinLoading)
        console.log('Error connecting to MongoDB', error.message)
    })

const numberSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        minlength: 8
    } 
})
numberSchema.plugin(uniqueValidator)
numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Number = mongoose.model('Number', numberSchema)

module.exports = mongoose.model('Number', numberSchema)
