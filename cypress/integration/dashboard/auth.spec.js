/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Authentication Test', () => {

    const EMAIL = chance.email();
    const USERNAME = chance.word({ length: chance.integer({ min: 4, max: 20 }) });
    const PASS = chance.hash({ length: chance.integer({ min: 8, max: 30 }) });

    beforeEach(() => {
        cy.visit('/')
    })

    // REGISTRATION TEST
    it('Registers', () => {
        cy.register(EMAIL, USERNAME, PASS)
    })

    // LOGIN TEST
    it('Logins', () => {
        cy.login(USERNAME, PASS)
    })

    // LOGOUT TEST
    it('Logouts', () => {
        cy.login(USERNAME, PASS)

        cy.get('#logout-button').click()
        cy.get('button[type="submit"]').should('contain.text', 'Login')
    })

});