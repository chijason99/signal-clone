describe('My First Test', () => {
  it('sign in to the chat app with michael', () => {
    cy.visit('http://localhost:3000')
    cy.contains("Sign In").click()
    cy.url().should('include',"auth/SignIn")
    cy.get('[data-cy="sign-in-email"]').type("test123@test.com")
    cy.get('[data-cy="sign-in-pw"]').type("abc123abc123")
    cy.get('[data-cy="sign-in-btn"]').click()
    
  })
})