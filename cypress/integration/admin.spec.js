/// <reference types="Cypress" />

context('Admin', () => {
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

  it('list restaurants', function () {
    cy.visit('/admin')
    cy.location('pathname').should('equal', '/admin/restaurants')
    this.restaurantsJSON.data.forEach(rest => {
      cy.contains(rest.attributes.name).should('be.visible')
    })
  })

  it('list reviews', function () {
    cy.visit('/admin')
    cy.contains('reviews').click()
    cy.location('pathname').should('equal', '/admin/reviews')
    this.reviewsJSON.data.forEach(rev => {
      cy.contains(rev.attributes.comment.slice(0, 4)).should('be.visible')
    })
  })

  it('list users', function () {
    cy.visit('/admin')
    cy.contains('users').click()
    cy.location('pathname').should('equal', '/admin/users')
    this.usersJSON.data.forEach(user => {
      cy.contains(user.attributes.email).should('be.visible')
    })
  })

  it('delete user', function () {
    cy.visit('/admin/users')
    const user = this.usersJSON.data[0]
    cy.route('DELETE', '/users/*', {}).as('delUser')
    cy.contains('tr', user.attributes.email).find('button:contains("delete")')
      .click()
    cy.wait('@delUser')
    cy.contains(user.attributes.email).should('not.exist')
  })

  it('update user', function () {
    cy.visit('/admin/users')
    const user = this.usersJSON.data[0]
    cy.contains('tr', user.attributes.email).find('a:contains("edit")').click()
    cy.location('pathname').should('equal', `/admin/users/${user.id}/edit`)

    cy.get('[name=email]').clear().type("newEmail@test.io")
    cy.get('[name=username]').clear().type("newUsername")
    cy.get('[name=password]').type("newPassword")
    cy.get('[name=confirm]').type("newPassword")
    cy.get('[type="radio"][name="type"][value="Admin"]').check()

    Object.assign(user.attributes, { email: 'newEmail@test.io', role: 'Admin' })
    cy.route('PATCH', '/users/*', { data: user }).as('editUser')
    cy.route('GET', '/users**', this.usersJSON)
    cy.contains('button', 'SAVE').click()
    cy.wait('@editUser')
    cy.get('@editUser').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.email).to.equal('newEmail@test.io')
      expect(attributes.password).to.equal('newPassword')
      expect(attributes.username).to.equal('newUsername')
    })
    cy.contains('newEmail@test.io').should('be.visible')
  })

  it('delete review', function () {
    cy.visit('/admin/reviews')
    const review = this.reviewsJSON.data[0]
    cy.wait('@reviews')
    cy.route('DELETE', '/reviews/*', {}).as('delReview')
    cy.contains('tr', review.attributes.comment)
      .find('button:contains("delete")')
      .click()
    cy.wait('@delReview')
    cy.contains(review.attributes.comment).should('not.exist')
  })

  it('update review', function () {
    cy.visit('/admin/reviews')
    const review = this.reviewsJSON.data[0]
    cy.contains('tr', review.attributes.comment).find('a:contains("edit")').click()
    cy.location('pathname').should('equal', `/admin/reviews/${review.id}/edit`)

    cy.get('[name=comment]').clear().type("new_updated_comment")
    cy.get('[name=reply]').type("new_updated_reply")
    cy.get('[name=date]').type("2000-01-18")

    Object.assign(review.attributes, {
      comment: 'new_updated_comment',
      reply: 'new_updated_reply',
      date: '2000-01-18',
    })
    cy.route('PATCH', '/reviews/*', { data: review }).as('editReview')
    cy.route('GET', '/reviews**', this.reviewsJSON)
    cy.contains('button', 'SAVE').click()
    cy.wait('@editReview').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.comment).to.equal('new_updated_comment')
      expect(attributes.reply).to.equal('new_updated_reply')
      expect(attributes.date).to.equal('2000-01-18')
    })
    cy.contains('new_updated_comment').should('be.visible')
  })

  it('delete restaurant', function () {
    cy.visit('/admin')
    const restaurant = this.restaurantsJSON.data[0]
    cy.wait('@rests')
    cy.route('DELETE', '/stores/*', {}).as('delRestaurant')
    cy.contains('tr', restaurant.attributes.name)
      .find('button:contains("delete")')
      .click()
    cy.wait('@delRestaurant')
    cy.contains(restaurant.attributes.name).should('not.exist')
  })

  it('update restaurant', function () {
    cy.visit('/admin')
    const newName = 'new_store_name'
    const restaurant = this.restaurantsJSON.data[0]
    cy.wait('@rests')
    cy.contains('tr', restaurant.attributes.name).find('a:contains("edit")').click()
    cy.location('pathname').should('equal', `/admin/restaurants/${restaurant.id}/edit`)

    cy.get('[name=name]').clear().type(newName)

    Object.assign(restaurant.attributes, { name: newName})
    cy.route('PATCH', '/stores/*', { data: restaurant }).as('editRest')
    cy.route('GET', '/stores**', this.restaurantsJSON)
    cy.contains('button', 'SAVE').click()
    cy.wait('@editRest').then(function (xhr) {
      const { data: { attributes } = {} } = xhr.requestBody
      expect(attributes.name).to.equal(newName)
    })
    cy.contains(newName).should('be.visible')
  })
})
