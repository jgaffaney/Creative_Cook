const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `
    SELECT * from pairings
    ORDER BY ingredient_one_id;
    `
    pool.query(queryText)
        .then(response => {
            console.log('response from GET pairings: ', response);
            res.send(response.rows)
        }).catch(err => {
            console.log('Error on GET pairings: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;
