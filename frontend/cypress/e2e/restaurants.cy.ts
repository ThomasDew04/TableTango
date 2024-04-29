describe('Account tests', () => {
    beforeEach(() => {
        cy.login('test', 'test');
    })

    // - restaurant filteren op type eten
    it("Filter by foodtype", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants');
        cy.get('[data-cy=NoPlace]').should('exist');
        cy.get('[data-cy=American]').click();

        cy.wait(1000);
        cy.get('[data-cy=restaurant-7]').should('not.exist');
    });

    // - restaurant filteren op datum
    it("Filter by date", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants');
        cy.get('[data-cy=NoPlace]').should('exist');

        cy.wait(1000);
        cy.get('[data-cy=date-filter]').type('2024-08-13');

        cy.wait(1000);
        cy.get('[data-cy=NoPlace]').should('not.exist');
    });

    // - klikken op restaurant
    it("Go to detail page", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants');
        cy.get('[data-cy=Tush]').should('exist');
        cy.get('[data-cy=Tush]').click();

        cy.wait(1000);
        cy.get('[data-cy=Tushtest]').should('exist');
    });
    
    // - reservatie maken
    it("Make reservation", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants/1');
        cy.get('[data-cy=date-filter-resv]').type('2024-08-13');

        cy.wait(1000);
        // cy.get('[data-cy=timeslot-filter]').click();
        cy.get('[data-cy=timeslot-filter]').select('15:00');

        cy.wait(1000);
        // cy.get('[data-cy=num-guests]').click();
        cy.get('[data-cy=num-guests]').select('4');
        cy.get('[data-cy=resv-name]').type('test');
        cy.get('[data-cy=resv-phone]').type('test-phone');

        cy.wait(1000);
        cy.get('[data-cy=resv-btn]').click();

        cy.visit('http://localhost:8000/reservations');
        cy.get('[data-cy=test]').should('exist');
    });

    // - reservatie annuleren
    it("Cancel reservation", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/reservations');
        cy.get('[data-cy=test]').should('exist');
        cy.get('[data-cy=cncl-resv]').click();

        cy.wait(1000);
        cy.get('[data-cy=test]').should('not.exist');
    });
});