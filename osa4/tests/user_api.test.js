const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('validation tests', () => {
    test('no false username', async () => {
        const mockUser = new User({
            "username": "as",
            "name": "henri w",
            "passwordHash": "dsas"
        })

        const response = await api.post('/api/users').send(mockUser)


        expect(response.status).toBe(400)
    })

    test('no false password', async () => {
        const mockUser = new User({
            "username": "asdfs",
            "name": "henri w",
            "passwordHash": "as"
        })

        const response = await api.post('/api/users').send(mockUser)

        expect(response.status).toBe(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})