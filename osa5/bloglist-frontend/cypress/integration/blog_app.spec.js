describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'admin',
      password: 'admin',
      name: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('logged in succesfully')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admins')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#createnewblog').click()
      cy.get('#title').type('titleT')
      cy.get('#author').type('authorT')
      cy.get('#url').type('http://urlT')
      cy.get('#submit-button').click()

      cy.contains('titleT authorT')
    })

    it('A blog can be liked', function () {
      cy.get('#createnewblog').click()
      cy.get('#title').type('titleT')
      cy.get('#author').type('authorT')
      cy.get('#url').type('http://urlT')
      cy.get('#submit-button').click()
      cy.get('#show-button').click()
      cy.get('#like-button').click()
      cy.wait(1500) // Cypress ei ehdi päivittää sovelluksen tilaa
      cy.contains('1')
    })

    it('A blog can be removed', function () {
      cy.get('#createnewblog').click()
      cy.get('#title').type('titleT')
      cy.get('#author').type('authorT')
      cy.get('#url').type('http://urlT')
      cy.get('#submit-button').click()
      cy.get('#show-button').click()
      cy.get('#remove-button').click()
      cy.wait(5500) // Cypress ei ehdi päivittää sovelluksen tilaa
      cy.get('titleT authorT').should('not.exist')
    })
  })
})