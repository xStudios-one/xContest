/*
* This file contains setup for github workflow CI
* DO NOT REMOVE, RENAME OR MOVE THIS FILE
*/

// Imports
const { PrismaClient } = require('@prisma/client')
const Chance = require('chance')

const prisma = new PrismaClient();
const chance = new Chance();

// Setup database
(async () => {
    // Create random contest
    await prisma.contest.create({
        data: {
            name: chance.hash({ length: chance.integer({ min: 4, max: 15 }) }),
            tag: chance.hash({ length: chance.integer({ min: 3, max: 7 }) }),
        },
    })
})()