describe('Can sign in with valid credentials', () => {
  const testAccount1Email = process.env.TEST_ACCOUNT_1_EMAIL
  const testAccount1Pw = process.env.TEST_ACCOUNT_1_PW
  const testAccount2Email = process.env.TEST_ACCOUNT_2_EMAIL
  const testAccount2Pw = process.env.TEST_ACCOUNT_2_PW

  it('sign in to the chat app with michael', () => {
    cy.visit('http://localhost:3000')
    cy.contains("Sign In").click()
    cy.url().should('include',"auth/SignIn")
    cy.get('[data-cy="sign-in-email"]').type(`${testAccount1Email}`)
    cy.get('[data-cy="sign-in-pw"]').type(`${testAccount1Pw}`)
    cy.get('[data-cy="sign-in-btn"]').click()
  })
  it('sign in to the chat app with david', () => {
    cy.visit('http://localhost:3000')
    cy.contains("Sign In").click()
    cy.url().should('include',"auth/SignIn")
    cy.get('[data-cy="sign-in-email"]').type(`${testAccount2Email}`)
    cy.get('[data-cy="sign-in-pw"]').type(`${testAccount2Pw}`)
    cy.get('[data-cy="sign-in-btn"]').click()
  })
})