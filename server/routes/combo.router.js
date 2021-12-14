const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Combo GET route
router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "combos"
        ORDER BY "id";
        `;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows); // Contains all combos
        })
        .catch(err => {
            console.log('Error in Challenge GET', err);
            res.sendStatus(500);
        })
}); // End GET

module.exports = router;