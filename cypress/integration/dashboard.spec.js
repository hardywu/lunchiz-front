/// <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(function () {
    cy.server()
    cy.fixture('restaurants').as('restaurantsJSON')
    cy.fixture('restaurant_to_review').as('restaurantJSON')
    cy.fixture('reviews').as('reviewsJSON')
    cy.route('GET', '/stores**', 'fx:restaurants').as('rests')
    cy.route('GET', '/stores/*', 'fx:restaurant_to_review').as('rest')
    cy.route('GET', '/reviews**', 'fx:reviews')
    cy.route('GET', '/auth/me**', 'fx:owner_me')
    cy.ownerLogin()
  })

  it('list restaurants', function () {
    cy.visit('/dashboard')
    this.restaurantsJSON.data.forEach(rest => {
      cy.contains(rest.attributes.name).should('be.visible')
    })
  })

  it('list reviews', function () {
    cy.visit('/dashboard')
    cy.contains('pending').click()
    cy.location('pathname').should('equal', '/dashboard/pendingReviews')
    this.reviewsJSON.data.forEach(rev => {
      cy.contains(rev.attributes.comment.slice(0, 4)).should('be.visible')
    })
  })
})
