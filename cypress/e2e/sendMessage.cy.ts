describe('Message function', () => {
    it('can send message after signing in', () => {
        cy.signIn(Cypress.env('testEmailMichael'), Cypress.env('testPasswordMichael'))
        cy.getDataCy("david").click()
        cy.getDataCy("msg-input").type("testing from cypress")
        cy.getDataCy("send-msg-btn").click()
        cy.contains("testing from cypress")
    })
})