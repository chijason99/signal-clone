/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      //   login(email: string, password: string): Chainable<void>
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      getDataCy(value: string): Chainable<JQuery<HTMLElement>>
      signIn(email:string,password:string):Chainable<void>
      signUp(email:string,password:string):Chainable<void>
      signOut():Chainable<void>
    }
  }
}
Cypress.Commands.add("getDataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("signIn",(email,password) => {
    cy.visit('/')
    cy.contains("Sign In").click()
    cy.url().should('include',"auth/SignIn")
    cy.getDataCy('sign-in-btn').click()
    cy.getDataCy('sign-in-email').type(email)
    cy.getDataCy('sign-in-pw').type(password)
    cy.getDataCy('sign-in-btn').click()
    return
})
Cypress.Commands.add('signUp',(email,password) => {
    cy.visit('/')
    cy.contains("Sign Up").click()
    cy.url().should('include',"auth/SignUp")
    cy.getDataCy('sign-up-btn').click()
    cy.getDataCy('sign-up-email').type(email)
    cy.getDataCy('sign-up-pw').type(password)
    cy.getDataCy('sign-up-btn').click()
})
Cypress.Commands.add("signOut",() => {
    cy.getDataCy('sign-out-btn').click();
    return
})