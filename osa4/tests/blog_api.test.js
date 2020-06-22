const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'henkkas blog',
        author: 'Henri W',
        url: 'test...',
        likes: 123
    },
    {
        title: 'henkkas blog2',
        author: 'Henri W',
        url: 'test2...',
        likes: 1232
    },
    {
        title: 'henkkas blog2',
        author: 'Henri W',
        url: 'test2...',
        likes: ''
    },
    {
        title: '',
        author: 'Henri W',
        url: 'test2...',
        likes: ''
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('return right amount of blogs', async () => {

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)

})

test('identifier is called id', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('post count increases', async () => {

    let savedBlog = new Blog(initialBlogs[0])

    await savedBlog.save()

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('likes 0 if no value given', async () => {
    let savedBlog = new Blog(initialBlogs[2])

    await api.post('/api/blogs').send(savedBlog)

    const response = await api.get('/api/blogs')


    expect(response.body[2].likes).toBeCloseTo(0)
})

test('return 400 if no title or url given', async () => {
    let savedBlog = new Blog(initialBlogs[3])

    const response = await api.post('/api/blogs').send(savedBlog)


    expect(response.status).toBe(400)
})

afterAll(() => {
    mongoose.connection.close()
})

