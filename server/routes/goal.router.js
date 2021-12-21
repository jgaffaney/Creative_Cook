const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `
SELECT "goal" FROM "user_metrics"
WHERE "user_id" = $1;
        `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows); // Contains goal data
        })
        .catch(err => {
            console.log('Error in GOAL GET', err);
            res.sendStatus(500);
        })
}); // End GET


/**
 * POST route template
 */
router.post('/', (req, res) => {
  
});

router.put('/', (req, res) => {
    const id = req.user.id
    const queryText = `
    UPDATE "user_metrics"
    SET "goal" = "goal" + 5
    WHERE "id" = $1; 
    `
    values = [id]
    pool.query(queryText, values)
        .then(response => {
            res.send(response)
        }).catch(err=> {
            console.log('Error on PUT goal: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;
