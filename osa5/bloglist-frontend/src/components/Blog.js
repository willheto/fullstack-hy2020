import React, { useState } from 'react'
import './Blog.css'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user, handleLike }) => {

  const [moreVisible, setMoreVisible] = useState(false)
  const removeVisible = { display: !(user.username === blog.user.username) ? 'none' : '' }

  const handleRemove = async (blog) => {
    await blogService.removeBlog(blog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
  }

  const allVisible = () => (
    <div className="Blog">
      <p>{blog.title} {blog.author} <button onClick={() => setMoreVisible(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button></p>
      <div style={removeVisible}>
        <button id='remove-button' onClick={() => handleRemove(blog)}>remove blog</button>
      </div>
    </div>
  )

  const hidden = () => (
    <div className="Blog">
      {blog.title} {blog.author}
      <button id='show-button' onClick={() => setMoreVisible(true)}>show more...</button>
    </div>
  )

  return (
    <div>
      { moreVisible ?
        allVisible()
        : hidden()
      }
    </div>

  )
}

export default Blog