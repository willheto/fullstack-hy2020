import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')

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
      }, 3000)
    } catch {
      console.error('login failed!')
      setNotification('wrong username or password')

      setTimeout(() => {
        setNotification('')
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification('logged out succesfully')

    setTimeout(() => {
      setNotification('')
    }, 3000)
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

  return (
    <div>
      { user === null ?
        loginForm() :
        <BlogForm setNotification={setNotification} notification={notification} user={user} handleLogout={handleLogout}></BlogForm>
      }
    </div>

  )
}

export default App