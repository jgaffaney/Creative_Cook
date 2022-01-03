const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `
SELECT "goal", "name", "metric_id" FROM "user_metrics"
JOIN "metrics" ON "metrics".id = "user_metrics".metric_id
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

// * GET  Ingredient route
// */
router.get('/ingredient', (req, res) => {
   const queryText = `
   SELECT DISTINCT unnest(combos.ingredient_list) AS ingredient 
   FROM combos
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
    SET "goal" = "goal" +5
    WHERE "user_id" = $1 AND "metric_id" = $2; 
    `;
    values = [id, req.body.metric_id]
    console.log("!!!", req.body);
    pool.query(queryText, values)
        .then(response => {
            res.sendStatus(200)
        }).catch(err=> {
            console.log('Error on PUT goal: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;
