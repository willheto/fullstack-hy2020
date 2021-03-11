import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNew = async blogDetails => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, blogDetails, config)
  return request.data
}

const editBlog = async blogDetails => {

  const blog = {
    user: blogDetails.user.id,
    likes: blogDetails.likes + 1,
    author: blogDetails.author,
    title: blogDetails.title,
    url: blogDetails.url
  }

  const config = {
    headers: { Authorization: token },
  }
  const url = 'api/blogs/' + blogDetails.id
  const request = await axios.put(url, blog, config)
  return request.data
}

const removeBlog = async blogDetails => {
  const config = {
    headers: { Authorization: token },
  }
  const url = 'api/blogs/' + blogDetails.id
  const request = await axios.delete(url, config)
  return request.data
}

export default { getAll, createNew, setToken, editBlog, removeBlog }