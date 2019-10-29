/// <reference types="Cypress" />

context('Dashboard', () => {
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
    cy.contains('Pending').click()
    cy.location('pathname').should('equal', '/dashboard/pendingReviews')
    this.reviewsJSON.data.forEach(rev => {
      cy.contains(rev.attributes.comment.slice(0, 4)).should('be.visible')
    })
  })

  it('reply review', function() {
    cy.visit('dashboard/pendingReviews')
    const review = this.reviewsJSON.data.shift()

    cy.route('GET', '/reviews/*', { data: review })
    cy.contains('tr', review.attributes.comment).find('a:contains("Reply")')
      .click()
    cy.location('pathname')
      .should('equal', `/dashboard/pendingReviews/reply/${review.id}`)

    cy.get('[name=reply]').clear().type("new_reply_text")
    Object.assign(review.attributes, {
      reply: 'new_reply_text',
    })

    cy.route('PATCH', '/reviews/**', { data: review }).as('editReview')
    cy.route('GET', '/reviews**', this.reviewsJSON).as('reviews')
    cy.contains('button', 'SAVE').click()
    cy.wait('@editReview').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.reply).to.equal('new_reply_text')
    })
    cy.wait('@reviews')
    cy.contains(review.attributes.comment).should('not.exist')
  })

  it('add new restaurant', function() {
    cy.visit('/dashboard')
    cy.contains('a', 'Add').click()
    cy.location('pathname').should('equal', '/dashboard/createRestaurant')

    const rest = { attributes: { name: 'new_restaurant_with_new_name'} }
    this.restaurantsJSON.data.push(rest)
    cy.get('[name=name]').clear().type(rest.attributes.name)

    cy.route('POST', '/stores**', { data: rest }).as('createRest')
    cy.route('GET', '/stores**', this.restaurantsJSON).as('getRests')
    cy.contains('button', 'Add').click()
    cy.wait('@createRest').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.name).to.equal(rest.attributes.name)
    })
    cy.wait('@getRests')
    cy.contains(rest.attributes.name).should('be.visible')
  })
})
