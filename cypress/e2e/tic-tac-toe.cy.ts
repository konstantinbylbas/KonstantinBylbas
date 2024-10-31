/** @format */

import Translation from '../../src/assets/locales/en.json';

describe('Game: tic-tac-toe E2E Test', () => {
    it('Game: tic-tac-toe', () => {
        cy.visit('http://127.0.0.1:3000/#/platform/game/naughts-and-crosses');

        cy.get(`[data-testid="players-count-list"]`).should('exist').click();
        cy.get(`.select_options-list > .select_options-list_option`)
            .eq(1)
            .should('be.visible')
            .click();

        [1, 2, 4, 5, 7].map(cell =>
            cy
                .get(`.naughtsAndCrosses_board_cell:nth-of-type(${cell})`)
                .should('exist')
                .click(),
        );
        cy.contains(Translation.Games.naughtsAndCrosses.winner).should('exist');

        cy.get(`[data-testid="players-count-list"]`).should('exist').click();
        cy.get(`[data-testid="players-count-list"] .select_options-list_option`)
            .eq(0)
            .should('be.visible')
            .click();

        cy.get(`[data-testid="difficulty-list"]`).should('exist').click();
        cy.get(`[data-testid="difficulty-list"] .select_options-list_option`)
            .eq(1)
            .should('exist')
            .click();

        cy.get(`.naughtsAndCrosses_board_cell:nth-of-type(5)`)
            .should('exist')
            .click();

        cy.get('.naughtsAndCrosses_board_cell.cross').should('have.length', 1);
        cy.get('.naughtsAndCrosses_board_cell.zero').should('have.length', 1);

        cy.get(`[data-testid="restart"]`).should('exist').click();

        cy.get('.naughtsAndCrosses_board_cell').should(
            'not.have.class',
            'zero',
        );
        cy.get('.naughtsAndCrosses_board_cell').should(
            'not.have.class',
            'cross',
        );
    });
});
