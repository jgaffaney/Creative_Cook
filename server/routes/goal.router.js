const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `
    SELECT * FROM "user_metrics"
    WHERE "user_id" = $1
    ORDER BY metric_id;
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

// * GET  Ingredient route
// */
router.get('/recipe', (req, res) => {
    const queryText = `
    SELECT DISTINCT url FROM recipes
    WHERE "user_id" = $1
    GROUP BY url;
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
    console.log('hello from combo post');
  const queryText = `
    INSERT INTO "user_metrics" ("user_id", "goal", "metric_id")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.user.id, req.body.goal, req.body.metric_id])
        .then(result => {
            res.sendStatus(201);
        }
        )
        .catch(err => {
            console.log('Error in POST', err);
            res.sendStatus(500);
        }
        )
});

router.put('/', (req, res) => {
    const id = req.user.id
    const queryText = `
    UPDATE "user_metrics"
    SET "goal" = $1
    WHERE "user_id" = $2 AND "metric_id" = $3; 
    `;
    values = [req.body.goal, id, req.body.metric_id]
    console.log("!!!", req.body);
    pool.query(queryText, values)
        .then(response => {
            res.sendStatus(200)
        }).catch(err=> {
            console.log('Error on PUT goal: ', err);
            res.sendStatus(500);
        })
})

router.put('/reset', (req, res) => {
    const id = req.user.id
    const queryText = `
    UPDATE "user_metrics"
    SET "goal" = 0
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
