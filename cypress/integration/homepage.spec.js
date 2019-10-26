/// <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(function () {
    cy.server()
    cy.fixture('restaurants').as('restaurantsJSON')
    cy.fixture('restaurant_to_review').as('restaurantJSON')
    cy.route('GET', '/stores**', 'fx:restaurants').as('rests')
    cy.route('GET', '/stores/*', 'fx:restaurant_to_review').as('rest')
    cy.route('GET', '/reviews**', 'fx:reviews')
    cy.login()
  })

  it('list restaurants -- filter by rate range', function () {
    cy.visit('/')
    this.restaurantsJSON.data.forEach(rest => {
      cy.contains(rest.attributes.name).should('be.visible')
    })
  })
})
