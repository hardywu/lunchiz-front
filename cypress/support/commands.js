// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { base64url, getJWT } from './utils'

Cypress.Commands.add("login", (email, password) => {
  cy.server()
  cy.route('GET', '/auth/me', 'fx:me')
  localStorage.setItem('Authorization', "Bearer " + getJWT())
})

Cypress.Commands.add("ownerLogin", (email, password) => {
  cy.server()
  cy.route('GET', '/auth/me', 'fx:owner_me')
  localStorage.setItem('Authorization', "Bearer " + getJWT())
})

Cypress.Commands.add("adminLogin", (email, password) => {
  cy.server()
  cy.route('GET', '/auth/me', 'fx:admin_me')
  localStorage.setItem('Authorization', "Bearer " + getJWT())
})

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
