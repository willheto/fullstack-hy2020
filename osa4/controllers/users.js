const usersRouter = require('express').Router()
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRounds = 10
    console.log(body)

    if (body.passwordHash.length < 3) {
        return response.status(400).send({ error: 'password too short' })
    }

    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })



    const savedUser = await newUser.save().catch(error => next(error))

    if (savedUser) {
        response.json(savedUser.toJSON())
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))

})

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: 'validation error' })
    }

    next(error)
}

usersRouter.use(errorHandler)

module.exports = usersRouter