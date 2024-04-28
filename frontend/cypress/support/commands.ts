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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
    interface Chainable {
        navigateHome(): Chainable<void>;
        login(name: string, password: string): Chainable<void>;
        logout(): Chainable<void>;
    }
}

Cypress.Commands.add('navigateHome', () => {
    cy.visit('http://localhost:8000');
});

Cypress.Commands.add('login', (name: string, password: string) => {
    cy.navigateHome();
    
    Cypress.log({
        displayName: 'Login',
        message: `Logging in as ${name}`,
    })

    cy.get('[data-cy=username]').type(name);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=login-btn]').click();
});

Cypress.Commands.add('logout', () => {
    cy.visit('http://localhost:8000/account');

    Cypress.log({
        displayName: 'Logout',
        message: `Logging out`,
    })

    cy.get('[data-cy=logout-btn]').click();
});