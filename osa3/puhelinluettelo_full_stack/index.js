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

let numbers = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "040-123123123",
        id: 2
    },
    {
        name: "Dan abramov",
        number: "12-43-234-345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
]

app.get('/api/persons', (request, response) => {
    response.send(numbers)
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

    const newObject = request.body

    if (newObject) {


        if (newObject.name && newObject.number) {
            for (let index = 0; index < numbers.length; index++) {
                if (numbers[index].name === newObject.name) {
                    response.status(400).json({ error: 'name must be unique' })
                    return
                }
            }

            const id = Math.floor(Math.random() * Math.floor(10000))
            newObject.id = id

            numbers = numbers.concat(newObject)
            console.log(`success, added ${newObject.name}`)
            response.status(200).json(newObject)
        } else {
            response.status(400).json({ error: 'a name AND a number must be given' })
        }



    }

})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    console.log(id)
    const presentedNumber = numbers.find(number => number.id === id)

    if (presentedNumber) {
        console.log(presentedNumber)
        response.json(presentedNumber)
    } response.status(404).end()

})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<div><p>Phonebook has info for ${numbers.length} people</p>
        <p>${date}</p></div>`)
})

app.get('/', (request, response) => {
    response.send('')
})

