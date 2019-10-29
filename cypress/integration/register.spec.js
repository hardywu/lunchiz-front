/// <reference types="Cypress" />
import { getJWT } from '../support/utils'

context('Register', () => {
  beforeEach(() => {
  })

  it('Register normal user using UI', () => {
    cy.visit('/register')
    cy.server()
    cy.route({
      method: 'POST',
      url: '/auth/signup',
      response: { data: { id: 32, type: 'User'} },
      headers: { 'authorization': getJWT() },
    }).as('signup')

    // enter valid username and password
    cy.get('[name=email]').type("newEmail@test.io")
    cy.get('[name=username]').type("newUser")
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

  it('Register owner using UI', () => {
    cy.visit('/register')
    cy.server()
    cy.route({
      method: 'POST',
      url: '/auth/signup',
      response: { data:
        { id: 32, type: 'User', attributes: { role: 'Owner' } },
      },
      headers: { 'authorization': getJWT() },
    }).as('signup')

    // enter valid username and password
    cy.get('[name=email]').type("newEmail@test.io")
    cy.get('[name=password]').type("newPassword")
    cy.get('[name=username]').type("newOwner")
    cy.get('[name=confirm]').type("newPassword")
    cy.get('[type="radio"][name="type"][value="Owner"]').check()
    cy.contains('button', 'REGISTER').click()
    cy.wait('@signup')

    cy.get('@signup').then(function (xhr) {
      expect(xhr.status).to.eq(200)
      expect(xhr.responseHeaders).to.have.property('authorization')
    })

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/dashboard')
  })

  it('Can not register with invalid email', () => {
    cy.visit('/register')

    // enter valid username and password
    cy.get('[name=email]').type("invalid@email")
    cy.get('[name=password]').type(Cypress.env("wrongPassword"))
    cy.get('[name=confirm]').type(Cypress.env("wrongPassword"))
    cy.contains('button', 'REGISTER').should('be.disabled')
  })

  it('Can not register with password not confirmed', () => {
    cy.visit('/register')

    // enter valid username and password
    cy.get('[name=email]').type("valid@test.io")
    cy.get('[name=password]').type(Cypress.env("wrongPassword"))
    cy.get('[name=confirm]').type("notConfirmed")
    cy.contains('button', 'REGISTER').should('be.disabled')
  })

  it('Can not register with existing email', () => {
    cy.visit('/register')
    cy.server()
    cy.route('POST', '/auth/signup').as('signup')

    // enter valid username and password
    cy.get('[name=email]').type(Cypress.env("email"))
    cy.get('[name=password]').type(Cypress.env("password"))
    cy.get('[name=confirm]').type(Cypress.env("password"))
    cy.contains('button', 'REGISTER').click()
    cy.wait('@signup')

    cy.get('@signup').then(function (xhr) {
      expect(xhr.status).to.eq(422)
    })

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/register')
    cy.contains('taken').should('be.visible')
  })
})
