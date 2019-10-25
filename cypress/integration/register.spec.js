/// <reference types="Cypress" />

context('Authentication', () => {
  beforeEach(() => {
  })

  it('Register using UI', () => {
    cy.visit('/register')
    cy.server()
    cy.route({
      method: 'POST',
      url: '/auth/signup',
      response: { data: { attributes: {} } },
      headers: { 'authorization': Cypress.env("sampleJWT") },
    }).as('signup')

    // enter valid username and password
    cy.get('[name=email]').type("newEmail")
    cy.get('[name=password]').type("newPassword")
    cy.get('[name=confirm]').type("newPassword")
    cy.contains('button', 'REGISTER').click()
    cy.wait('@signup')

    cy.get('@signup').then(function (xhr) {
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

  it('Does not register with invalid email', () => {
    cy.visit('/register')

    // enter valid username and password
    cy.get('[name=email]').type("invalid@email")
    cy.get('[name=password]').type(Cypress.env("wrongPassword"))
    cy.get('[name=confirm]').type(Cypress.env("wrongPassword"))
    cy.contains('button', 'REGISTER').click()

    // still on /signin page plus an error is displayed
    cy.location('pathname').should('equal', '/register')
    cy.contains('Username or password is incorrect').should('be.visible')
  })
})
