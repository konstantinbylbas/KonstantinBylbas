/** @format */

describe('Navigation E2E Test', () => {
    it('Navigation', () => {
        cy.visit('http://localhost:3000/#!/');

        new Array(5).fill(0).map((_, i) => {
            cy.get(`[data-testid="portfolio-tab-${i}"]`)
                .should('exist')
                .click();
        });

        new Array(2).fill(0).map((_, i) => {
            cy.get(`[data-testid="burger"]`).should('exist').click();

            cy.get(`[data-testid="platform-tab-${i}"]`).should('exist').click();

            new Array(1).fill(0).map((_, j) => {
                if (j !== 0) {
                    cy.get(`[data-testid="burger"]`).should('exist').click();
                }

                cy.get(`[data-testid="platform-tab-${i}_subtab-${j}"]`)
                    .should('exist')
                    .click();
            });
        });

        cy.get(`[data-testid="footer-name"]`).should('exist').click();
    });
});
