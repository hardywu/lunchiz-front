/// <reference types="Cypress" />

context('Dashboard Errors', () => {
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

  it('review reply form should show error msg', function() {
    cy.visit('dashboard/pendingReviews')

    const review = this.reviewsJSON.data[0]
    cy.contains('tr', review.attributes.comment).find('a:contains("Reply")')
      .click()
    cy.location('pathname')
      .should('equal', `/dashboard/pendingReviews/reply/${review.id}`)

    cy.get('[name=reply]').clear().type("new_reply_text")

    Object.assign(review.attributes, { reply: 'new_reply_text' })
    const errMsg = 'can not reply this review'
    cy.route({
      method: 'PATCH',
      url: '/reviews/**',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('editReview')
    cy.contains('button', 'SAVE').click()
    cy.wait('@editReview')
    cy.contains(errMsg).should('be.visible')
  })

  it('restaurant creation form should show error msg', function() {
    cy.visit('dashboard/createRestaurant')

    const rest = { attributes: { name: 'new_restaurant_with_new_name'} }
    cy.get('[name=name]').clear().type(rest.attributes.name)

    const errMsg = 'can not reply this review'
    cy.route({
      method: 'POST',
      url: '/stores**',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('createRest')

    cy.contains('button', 'Add').click()
    cy.wait('@createRest').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.name).to.equal(rest.attributes.name)
    })

    cy.contains('button', 'Add').click()
    cy.contains(errMsg).should('be.visible')
  })
})
