require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

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
    name: String,
    number: String
})

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Number = mongoose.model('Number', numberSchema)

/*const newNumber = new Number({
    name: 'Ada Lovelace',
    number: '123123123'
})

newNumber.save()
    .then(result => {
        console.log('test saved successfully')
    })
*/

module.exports = mongoose.model('Number', numberSchema)
