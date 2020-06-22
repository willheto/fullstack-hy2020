const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    let likes = 0
    for (let index = 0; index < blogs.length; index++) {
        likes += blogs[index].likes
    }

    return likes
}

const favoriteBlog = (blogs) => {
    let winner
    let mostLikes = 0

    for (let index = 0; index < blogs.length; index++) {
        if (blogs[index].likes > mostLikes) {
            winner = blogs[index]
            mostLikes = blogs[index].likes
        }

    }

    if (winner !== null) {
        return winner
    } return blogs[0]
}

const mostBlogs = (blogs) => {

    console.log(blogs[0].author)
    let blogAuthors = [{
        author: 'mock',
        blogs: 0
    }]

    for (let index = 0; index < blogs.length; index++) {

        const author = blogs[index].author

        for (let index = 0; index < blogAuthors.length; index++) {
            if (blogAuthors[index].author === author) {
                blogAuthors[index].blogs++
                break
            } else if(blogAuthors.length - index == 1) {
                blogAuthors.push({
                    author: author,
                    blogs: 1

                })
                break
            }

        }
    }

    let winner = blogAuthors[0]

    for (let index = 0; index < blogAuthors.length; index++) {
        if (blogAuthors[index].blogs > winner.blogs) {
            winner = blogAuthors[index]
        }
    }

    return winner

}

const mostLikes = (blogs) => {

    let blogAuthors = [{
        author: 'mock',
        likes: 0
    }]

    for (let index = 0; index < blogs.length; index++) {

        const author = blogs[index].author

        for (let indexi = 0; indexi < blogAuthors.length; indexi++) {
            if (blogAuthors[indexi].author === author) {
                blogAuthors[indexi].likes += blogs[index].likes
                break
            } else if(blogAuthors.length - indexi == 1) {
                blogAuthors.push({
                    author: author,
                    likes: blogs[index].likes

                })
                break
            }

        }
    }

    let winner = blogAuthors[0]

    for (let index = 0; index < blogAuthors.length; index++) {
        if (blogAuthors[index].likes > winner.likes) {
            winner = blogAuthors[index]
        }
    }

    return winner

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
