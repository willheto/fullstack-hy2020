const listHelper = require('../utils/list_helpers')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Not Edsger',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 123,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Sibelius',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

test('total likes of blogs', () => {

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(131)
})

test('blog with most likes test', () => {

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[2])

})

test('most blogs/author', () => {

    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toStrictEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 2
    })

})

test('most likes/author', () => {

    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toStrictEqual({
        author: 'Edsger W. Dijkstra',
        likes: 125
    })

})