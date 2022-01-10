const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { unstable_renderSubtreeIntoContainer } = require('react-dom');

router.get('/seasons', (req, res) => {
    console.log('in seasons GET');

    const queryText = `
    SELECT unnest(enum_range(NULL::season));
    `
    pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        }).catch(err => {
            console.log('Error from DB on seasons GET: ', err);
            res.sendStatus(500);
        })
})

router.get('/type', (req, res) => {
    const queryText = `
    SELECT unnest(enum_range(NULL::type));
    `
    pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        }).catch(err => {
            console.log('error on type GET: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;
