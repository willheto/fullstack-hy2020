const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    logger.info('attempting to get...')

    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)

    logger.info('done!')

})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    let blog

    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    console.log(user)

    if (body.title == '' || body.url == '') {
        response.status(400).end()
    }

    if (body.likes > 0) {
        blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
    } else {
        blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            user: user._id
        })
    }
    logger.info('attempting to post...')
    logger.info(user._id == blog.user)


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(blog)
})

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'JsonWebTokenError') {
        return response.status(400).send({ error: 'invalid token' })
    }

    next(error)
}

module.exports = blogsRouter