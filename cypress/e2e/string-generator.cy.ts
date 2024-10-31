/** @format */

import Translation from '../../src/assets/locales/en.json';

describe('Generator: string E2E Test', () => {
    it('Generator: string', () => {
        cy.visit('http://127.0.0.1:3000/#/platform/generator/string');

        cy.get('.filter .checkbox label').each($checkbox => {
            cy.wrap($checkbox).should('exist').click();
        });

        cy.get('.stringGenerator .row_controls .button')
            .should('exist')
            .click();

        cy.get('.history')
            .contains(Translation.Generators.string.history)
            .should('exist');

        cy.get('.stringGenerator .row_controls .input input')
            .invoke('val')
            .then(inputValue => {
                cy.get('.history p')
                    .last()
                    .invoke('text')
                    .should(paragraphText => {
                        expect(inputValue).to.eq(paragraphText);
                    });
            });

        cy.get('.history p').last().should('exist').click();

        cy.contains(Translation.Generators.string.copied).should('exist');

        cy.wait(500);
    });
});
