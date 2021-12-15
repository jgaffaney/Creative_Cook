const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Combo GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT * FROM "combos"
        WHERE "user_id" = $1;
        `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows); // Contains all combos
        })
        .catch(err => {
            console.log('Error in Combo GET', err);
            res.sendStatus(500);
        })
}); // End GET

module.exports = router;