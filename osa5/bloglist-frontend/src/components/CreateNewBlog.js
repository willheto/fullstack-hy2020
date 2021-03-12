import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateNewBlog = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.createNew({ title, author, url })
      props.setBlogs(props.blogs.concat(response))
      props.setNotification('a new blog was created succesfully')
      props.setCreateBlogVisible()
      setTimeout(() => {
        props.setNotification('')
      }, 3000)

    } catch {
      console.error('failed creating a blog!')
      props.setNotification('something went terribly wrong, and a blog could not be created')

      setTimeout(() => {
        props.setNotification('')
      }, 3000)
    }
  }

  return (
    <div>
      <div>
        <h2>create new blog</h2>
        <form onSubmit={handleNewBlog}>
          <div>
                        title: <input type="title" onChange={({ target }) => setTitle(target.value)}></input>
          </div>
          <div>
                        author: <input type="author" onChange={({ target }) => setAuthor(target.value)}></input>
          </div>
          <div>
                        url: <input type="url" onChange={({ target }) => setUrl(target.value)}></input>
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewBlog
