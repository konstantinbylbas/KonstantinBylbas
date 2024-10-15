/** @format */

describe('Tic-tac-toe E2E Test', () => {
    it('Tic-tac-toe', () => {
        cy.visit('http://localhost:3001/#/platform/game/naughts-and-crosses');

        cy.get(`[data-testid="players-count-list"]`).should('exist').click();

        cy.get(`.select_options-list > .select_options-list_option`)
            .eq(1)
            .should('be.visible')
            .click();
        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(1)`)
            .should('exist')
            .click();
        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(2)`)
            .should('exist')
            .click();
        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(4)`)
            .should('exist')
            .click();
        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(5)`)
            .should('exist')
            .click();
        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(7)`)
            .should('exist')
            .click();
    });
});
