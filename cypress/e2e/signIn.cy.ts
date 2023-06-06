describe('Can sign in with valid credentials', () => {
  it('sign in to the chat app with michael', () => {
    cy.signIn(Cypress.env('testEmailMichael'),Cypress.env('testPasswordMichael'))
    cy.getDataCy('h1').should('contain','SignalClone')
    cy.getDataCy('sign-out-btn').should('contain','Sign Out')
  })
  it('sign in to the chat app with david', () => {
    cy.signIn(Cypress.env('testEmailDavid'),Cypress.env('testPasswordDavid'))
    cy.getDataCy('h1').should('contain','SignalClone')
    cy.getDataCy('sign-out-btn').should('contain','Sign Out')
  })

})

describe('Cannot sign in with invalid credentials',() => {
  it('cannot sign in with wrong credentials',() => {
    cy.signIn('fakeEmail@email.com','FakePassword')
    cy.getDataCy('error-msg').should('contain','Invalid email or password. Please try again.')
  })
  it('Cannot sign in with wrong password',() => {
    cy.signIn(Cypress.env('testEmailDavid'),'FakePassword')
    cy.getDataCy('error-msg').should('contain','Invalid email or password. Please try again.')
  })
})