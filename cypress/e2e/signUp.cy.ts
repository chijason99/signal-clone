describe("Can sign up with new email",() => {
    it('can sign up with a new email',() => {
        cy.signUp('newtestemail@email.com','newTestPassword')
        cy.getDataCy('h1').should('contain','SignalClone')
        cy.getDataCy('sign-out-btn').should('contain','Sign Out')
        // delete the new account from the database after each test
    })
})