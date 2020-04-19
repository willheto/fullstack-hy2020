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

app.get('/api/persons/:id', (request, response, next) => {

    Number.findById(request.params.id)
        .then(number => {
            if (number) {
                response.json(number.toJSON())
            } else {
                console.log(error)
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {

    Number.findByIdAndRemove(request.params.id)
        .then(result => {
            console.log('removed')
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {

    const newObject = new Number({
        name: request.body.name,
        number: request.body.number
    })

    newObject.save()
        .then(result => {
            console.log('New number saved to database!')
            response.json(result.toJSON())
        })
        .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response) => {
    const updatedPerson = {
        name: request.body.name,
        number: request.body.number
    }

    Number.findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
        .then(result => {
            response.json(result.toJSON())
        })
        .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
    console.log(error.name)
    //console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: `${error.message}` })
    }

    next(error)
}

app.use(errorHandler)

app.get('/', (request, response) => {
    response.send('')
})

app.get('/info', (request, response) => {
    const date = new Date()
    const howMany = Number.countDocuments()

    Number.countDocuments({}, function (err, count) {
        response.send(`<div><p>Phonebook has info for ${count} people</p><p>${date}</p></div>`)
    })

})

