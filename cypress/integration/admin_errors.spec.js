/// <reference types="Cypress" />

context('Admin Errors', () => {
  beforeEach(function () {
    cy.server()
    cy.fixture('restaurants').as('restaurantsJSON')
    cy.fixture('restaurant_to_review').as('restaurantJSON')
    cy.fixture('reviews').as('reviewsJSON')
    cy.fixture('users').as('usersJSON')
    cy.route('GET', '/stores**', 'fx:restaurants').as('rests')
    cy.route('GET', '/users**', 'fx:users').as('users')
    cy.route('GET', '/stores/*', 'fx:restaurant_to_review').as('rest')
    cy.route('GET', '/reviews**', 'fx:reviews').as('reviews')
    cy.route('GET', '/auth/me**', 'fx:admin_me')
    cy.adminLogin()
  })

  it('user edit form should show error msg', function() {
    cy.visit('admin/users')

    const user = this.usersJSON.data[0]
    cy.contains('tr', user.attributes.email).find('a:contains("edit")').click()
    cy.location('pathname').should('equal', `/admin/users/${user.id}/edit`)

    cy.get('[name=email]').clear().type("duplicatedEmail@test.io")

    Object.assign(user.attributes, { email: 'newEmail@test.io', role: 'Admin' })
    const errMsg = 'Email conflicts with existing records'
    cy.route({
      method: 'PATCH',
      url: '/users/*',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('editUser')
    cy.contains('button', 'SAVE').click()
    cy.contains(errMsg).should('be.visible')
  })

  it('user delete fail should show error msg', function() {
    cy.visit('/admin/users')
    const user = this.usersJSON.data[0]
    const errMsg = 'Cannot delete this user'
    cy.route({
      method: 'DELETE',
      url: '/users/*',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('delUser')
    cy.contains('tr', user.attributes.email).find('button:contains("delete")')
      .click()
    cy.wait('@delUser')
    cy.contains(errMsg).should('be.visible')
  })


  it('review delete fail should show error msg', function() {
    cy.visit('/admin/reviews')
    const review = this.reviewsJSON.data[0]
    const errMsg = 'Cannot delete this review'
    cy.route({
      method: 'DELETE',
      url: '/reviews/*',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('delReview')
    cy.contains('tr', review.attributes.comment)
      .find('button:contains("delete")')
      .click()
    cy.wait('@delReview')
    cy.contains(errMsg).should('be.visible')
  })


  it('restaurant delete fail should show error msg', function() {
    cy.visit('/admin/restaurants')
    const restaurant = this.restaurantsJSON.data[0]
    const errMsg = 'Cannot delete this restaurant'
    cy.route({
      method: 'DELETE',
      url: '/stores/*',
      status: 422,
      response: { errors: [{ detail: errMsg }]}
    }).as('delRest')
    cy.contains('tr', restaurant.attributes.name)
      .find('button:contains("delete")')
      .click()
    cy.wait('@delRest')
    cy.contains(errMsg).should('be.visible')
  })
})
