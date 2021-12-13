const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/challenge', (req, res) => {
  // GET route code here
});

// Challenge POST route
router.post('/challenge', (req, res) => {
    const queryText = `
        INSERT INTO "feed_content" ("id", "description", "combo_id")
        VALUES ($1, $2, $3);
        `;
    values = [req.body.id, req.body.description, req.body.combo_id]
    console.log('values are', values);
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log('Error in Challenge POST', err);
            res.sendStatus(500);
        })
}); // End POST

module.exports = router;
