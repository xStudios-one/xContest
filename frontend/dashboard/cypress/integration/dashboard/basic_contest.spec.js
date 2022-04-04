/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

const EMAIL = chance.email();
const USERNAME = chance.word({ length: chance.integer({ min: 4, max: 20 }) });
const PASS = chance.hash({ length: chance.integer({ min: 8, max: 30 }) });

var contestName = '';

describe('Login from contest', () => {

    before(() => {
        cy.visit('/')
        cy.register(EMAIL, USERNAME, PASS)
    })

    beforeEach(() => {
        cy.visit('/')
    })

    // REGISTRATION TEST
    it('Logins from contest', () => {
        cy.get('a[href="/"]').isNotDetached().click({ force: true })

        cy.get('.contest-card').first().should('be.visible').then($el => {
            const name = $el.text()
            contestName = name;
            const el = cy.wrap($el)
            el.click()

            cy.contains(name).should('be.visible')
            cy.get('button[role="tab"]').contains('Login').should('be.visible').click()

            cy.login(USERNAME, PASS, false, false)

            cy.contains('Problems').should('have.class', 'mantine-Tabs-tabActive')

        })
    })

});

describe('Rest of contest functionality', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.login(USERNAME, PASS)
        cy.visit('/')
    })

    it('Joins contest', () => {
        cy.get('a[href="/"]').isNotDetached().click({ force: true })

        cy.contains(contestName).should('be.visible').then($el => {
            const name = $el.text()
            const el = cy.wrap($el)
            el.click()

            cy.contains(name).should('be.visible')
            cy.get('button[role="tab"]').contains('Join').should('be.visible').click()

            cy.get('input[type="checkbox"]').click()
            cy.get('button[type="submit"]').click()

            cy.get('#leave-contest').should('be.visible')
        })
    })
})