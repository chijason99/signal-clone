describe("Successfully sign out after clicking on the sign out button", () => {
  it("Sign out after clicking the sign out button", () => {
    cy.signIn(
      Cypress.env("testEmailMichael"),
      Cypress.env("testPasswordMichael")
    );
    cy.signOut();
    cy.contains("Sign In");
    cy.contains("Sign Up");
    cy.contains("Stay Connected. Chat in Real Time with SignalClone!");
  });
});
