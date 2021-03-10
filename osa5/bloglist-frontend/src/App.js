import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response))
      blogService.setToken(response.token)
      setUser(response)
      setNotification('logged in succesfully')

      setTimeout(() => {
        setNotification('')
      }, 3000);
    } catch {
      console.error('login failed!');
      setNotification('wrong username or password')

      setTimeout(() => {
        setNotification('')
      }, 3000);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification('logged out succesfully')

    setTimeout(() => {
      setNotification('')
    }, 3000);
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.createNew({ title, author, url })
      setBlogs(blogs.concat(response))
      setNotification('a new blog was created succesfully')

      setTimeout(() => {
        setNotification('')
      }, 3000);

    } catch {
      console.error('failed creating a blog!')
      setNotification('something went terribly wrong, and a blog could not be created')

      setTimeout(() => {
        setNotification('')
      }, 3000);
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username<input type="username" onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          password<input type="password" onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
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
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      { user === null ?
        loginForm() :
        blogsForm()
      }
    </div>

  )
}

export default App