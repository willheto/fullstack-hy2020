import React, { useState, useRef, useEffect } from 'react'
import Notification from './Notification'
import Togglable from './Togglable'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import blogService from '../services/blogs'

const BlogsForm = (props) => {

    const [blogs, setBlogs] = useState([])
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={props.notification} />
            {props.user.name} logged in
            <button onClick={props.handleLogout}>logout</button>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <CreateNewBlog setCreateBlogVisible={setCreateBlogVisible} createBlogVisible={createBlogVisible} blogs={blogs} setBlogs={setBlogs} setNotification={props.setNotification}></CreateNewBlog>
            </Togglable>
            {blogs.sort(function (a, b) {return b.likes - a.likes}).map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>
            )}
        </div>
    )
}
export default BlogsForm