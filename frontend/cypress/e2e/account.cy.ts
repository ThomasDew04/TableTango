// To run these tests: TableTango should be launched with no user currently logged in.
describe('Account tests', () => {
    beforeEach(() => {
        cy.login('test', 'test');
    })

    it("Succesful login", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.get('[data-cy=account-username]').should('have.text', 'test')
    });

    it("Edit user mail", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.get('[data-cy=pers-info]').click();
        cy.get('[data-cy=mail]').click();

        cy.wait(1000);

        cy.get('[data-cy=edit-field]').should('have.text', 'Edit email');
        cy.get('[data-cy=edit-field-input]').clear().type('testmail@mail.net');
        cy.get('[data-cy=save-acc-btn]').click();

        cy.wait(1000);

        cy.get('[data-cy=acc-field-mail]').should('have.text', 'testmail@mail.net');
    });

    it("Edit user mail back to original", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.get('[data-cy=pers-info]').click();
        cy.get('[data-cy=mail]').click();

        cy.wait(1000);

        cy.get('[data-cy=edit-field]').should('have.text', 'Edit email');
        cy.get('[data-cy=edit-field-input]').clear().type('test@mail.com');
        cy.get('[data-cy=save-acc-btn]').click();

        cy.wait(1000);

        cy.get('[data-cy=acc-field-mail]').should('have.text', 'test@mail.com');
    });

    it("Logout", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.logout();
        cy.get('[data-cy=auth-btn]').should('exist');
    })
})