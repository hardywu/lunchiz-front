/// <reference types="Cypress" />

context('Homepage', () => {
  beforeEach(function () {
    cy.server()
    cy.fixture('restaurants').as('restaurantsJSON')
    cy.fixture('restaurant_to_review').as('restaurantJSON')
    cy.fixture('reviews').as('reviewsJSON')
    cy.login()
  })

  it('list restaurants -- filter by rate range', function () {
    cy.route('GET', '/stores**', this.restaurantsJSON).as('rests')
    cy.visit('/')
    this.restaurantsJSON.data.forEach(rest => {
      cy.contains(rest.attributes.name).should('be.visible')
    })
  })

  it('user should write a review', function () {
    this.restaurantsJSON.data.push(this.restaurantJSON.data)
    cy.route('GET', '/stores**', this.restaurantsJSON).as('rests')
    cy.route('GET', '/stores/*', this.restaurantJSON).as('rest')
    cy.route('GET', "/reviews**", this.reviewsJSON)
    cy.visit('/')
    cy.contains('a', this.restaurantJSON.data.attributes.name).click()
    cy.location('pathname')
      .should('equal', `/restaurant/${this.restaurantJSON.data.id}`)
    cy.contains('Write').click()
    cy.location('pathname')
      .should('equal', `/restaurant/${this.restaurantJSON.data.id}/newReview`)

    const review = {
      attributes: {
        comment: 'new_comment_created_now',
        date: '2000-01-28',
      },
    }
    this.reviewsJSON.data.push(review)

    cy.get('[name=comment]').clear().type(review.attributes.comment)
    cy.get('[name=date]').type(review.attributes.date)

    cy.route('POST', '/reviews**', { data: review }).as('newReview')
    cy.route('GET', '/stores/*', this.restaurantJSON)
    cy.route('GET', "/reviews**", this.reviewsJSON).as('newReviews')
    cy.contains('button', 'Create').click()
    cy.wait('@newReview').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.comment).to.equal(review.attributes.comment)
      expect(attributes.date).to.equal(review.attributes.date)
    })
    cy.wait('@newReviews')
    cy.contains(review.attributes.comment).should('be.visible')

  })
})
