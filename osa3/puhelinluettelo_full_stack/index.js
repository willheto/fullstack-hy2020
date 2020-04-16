const Number = require('./models/number')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('build'))
app.use(cors())

app.use(morgan(':method :url :response-time :type'))
morgan.token('type', function (req, res) {
    if (JSON.stringify(req.body) !== '{}') {
        return JSON.stringify(req.body)
    } return ''
})
app.use(express.json())

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)

app.get('/api/persons', (request, response) => {
    Number.find({})
        .then(result => {
            response.json(result.map(number => number.toJSON()))
        })
})

app.put('/api/persons/:id', (request, response) => {
    console.log(request.body)
    const newPerson = request.body
    const id = request.params.id
    numbers.map(number => number.id !== id ? number : newPerson)
    response.status(200).json(newPerson)

})

app.delete('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    console.log(id)
    numbers = numbers.filter(number => number.id !== id)

    response.status(204).end()

})

app.post('/api/persons', (request, response) => {

    const newObject = new Number({
        name: request.body.name,
        number: request.body.number
    })

    newObject.save()
    .then(result => {
        console.log('New number saved to database!')
        response.json(result.toJSON())
    })

})

app.get('/api/persons/:id', (request, response) => {

    Number.findById(request.params.id)
        .then(result => {
            response.json(result.toJSON())
        })
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<div><p>Phonebook has info for ${numbers.length} people</p>
        <p>${date}</p></div>`)
})

app.get('/', (request, response) => {
    response.send('')
})

