import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://testurl',
    like: 123,
    user: {
      username: 'test username'
    }
  }

  const user = {
    username: 'test username',
    name: 'test user',
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'test title test authorshow more...'
  )
})

test('clicking show more shows all information', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://testurl',
    like: 123,
    user: {
      username: 'test username'
    }
  }

  const user = {
    username: 'test username',
    name: 'test user',
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const button = component.getByText('show more...')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'test title test author hidehttp://testurllikes: likeremove blog'
  )
})

test('clicking like-button two times calls the same eventhandler excatly two times', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://testurl',
    like: 123,
    user: {
      username: 'test username'
    }
  }

  const user = {
    username: 'test username',
    name: 'test user',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} />
  )

  const showMoreButton = component.getByText('show more...')
  fireEvent.click(showMoreButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})