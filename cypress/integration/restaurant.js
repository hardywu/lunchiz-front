/// <reference types="Cypress" />

context('Restaurant', () => {
  beforeEach(function () {
    cy.server()
    cy.fixture('restaurants').as('restaurantsJSON')
    cy.fixture('restaurant_to_review').as('restaurantJSON')
    cy.route('GET', '/stores**', 'fx:restaurants').as('rests')
    cy.route('GET', '/stores/*', 'fx:restaurant_to_review').as('rest')
    cy.route('GET', '/reviews**', 'fx:reviews')
    cy.login()
  })

  it('show restaurant', function () {
    cy.visit('/restaurant/' + this.restaurantJSON.data.id)
    cy.contains(this.restaurantJSON.data.attributes.name).should('be.visible')
    cy.contains('a', 'latest').should('be.visible')
    cy.contains('a', 'write').should('be.visible')
    cy.route('GET', '/reviews**', 'fx:reviews').as('reviews')


    cy.contains('a', 'highest').should('be.visible')
    cy.route('GET', '/reviews**', 'fx:reviews').as('reviews')
    cy.contains('highest').click()
    cy.wait('@reviews')
    cy.get('@reviews').then(function (xhr) {
      expect(xhr.url).to.contains('orderByRate=desc')
    })


    cy.contains('a', 'lowest').should('be.visible')
    cy.route('GET', '/reviews**', 'fx:reviews').as('reviews')
    cy.contains('lowest').click()
    cy.wait('@reviews')
    cy.get('@reviews').then(function (xhr) {
      expect(xhr.url).to.contains('orderByRate=asc')
    })
  })

  it('write a review', function () {
    cy.visit('/restaurant/' + this.restaurantJSON.data.id)
    cy.contains('pending').click()
    cy.location('pathname').should('equal', '/dashboard/pendingReviews')
    this.reviewsJSON.data.forEach(rev => {
      cy.contains(rev.attributes.comment.slice(0, 4)).should('be.visible')
    })
  })
})
