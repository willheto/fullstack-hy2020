import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({username, password})
      setUser(response)
      console.log(response)
    } catch {
      console.error('login failed!');
    }


  }
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
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
      {user.name} logged in
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