describe('Account tests', () => {
    beforeEach(() => {
        cy.login('test', 'test');
    })

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

    it("Add to favorites", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants/4');
        cy.get('[data-cy=Tushtest]').should('exist');

        cy.wait(1000);
        cy.get('[data-cy=add-fav]').click();

        cy.wait(1000);
        cy.visit('http://localhost:8000/favorites');
        cy.get('[data-cy=Tushfav]').should('exist');
    });

    it("Remove from favorites", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants/4');
        cy.get('[data-cy=Tushtest]').should('exist');

        cy.wait(1000);
        cy.get('[data-cy=remove-fav]').click();

        cy.wait(1000);
        cy.visit('http://localhost:8000/favorites');
        cy.get('[data-cy=Tushfav]').should('not.exist');
    });
    
    it("Make reservation", {
        "viewportWidth": 1920,
        "viewportHeight": 1080
    }, () => {
        cy.visit('http://localhost:8000/restaurants/1');
        cy.get('[data-cy=date-filter-resv]').type('2024-08-13');

        cy.wait(1000);
        cy.get('[data-cy=timeslot-filter]').select('15:00');

        cy.wait(1000);
        cy.get('[data-cy=num-guests]').select('4');
        cy.get('[data-cy=resv-name]').type('test');
        cy.get('[data-cy=resv-phone]').type('test-phone');

        cy.wait(1000);
        cy.get('[data-cy=resv-btn]').click();

        cy.visit('http://localhost:8000/reservations');
        cy.get('[data-cy=test]').should('exist');
    });

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