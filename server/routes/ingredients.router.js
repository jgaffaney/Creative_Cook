const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `
    SELECT * FROM ingredients;
    `
    pool.query(queryText)
        .then(response => {
            console.log('Response from ingredients DB: ', response);
            res.send(response.rows)
        }).catch(err => {
            console.log("Error on GET ingredients from DB: ", err);
            res.sendStatus(500)
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
