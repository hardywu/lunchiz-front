/// <reference types="Cypress" />

context('Authentication', () => {
  beforeEach(() => {
  })

  it('redirect to login for unsigned user', () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/login')
  })

  it('Logs in using UI', () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/login')
    cy.server()
    cy.route('POST', '/auth/signin').as('signin')

    // enter valid username and password
    cy.get('[name=email]').type(Cypress.env('email'))
    cy.get('[name=password]').type(Cypress.env('password'))
    cy.contains('button', 'SIGN IN').click()
    cy.wait('@signin')

    cy.get('@signin').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.responseHeaders).to.have.property('authorization')
    })

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/')
    cy.then(() => {
      /* global window */
      const jwt = window.localStorage.getItem('Authorization')
      expect(jwt).to.be.a('string')
    })

    // now we can log out
    cy.contains('Logout').click()
    cy.location('pathname').should('equal', '/login')
  })

  it('Does not log in with invalid password', () => {
    cy.visit('/')
    cy.location('pathname').should('equal', '/login')

    // enter valid username and password
    cy.get('[name=email]').type(Cypress.env("wrongEmail"))
    cy.get('[name=password]').type(Cypress.env("wrongPassword"))
    cy.contains('button', 'SIGN IN').click()

    // still on /signin page plus an error is displayed
    cy.location('pathname').should('equal', '/login')
    cy.contains('Username or password is incorrect').should('be.visible')
  })
})
