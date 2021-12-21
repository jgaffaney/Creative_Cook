const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('params in pairings GET: ', req.params.id);
    const id = req.params.id;
    const queryText = `
    SELECT "ingredients"."id", "name" from ingredients
    JOIN "pairings" ON "pairings"."ingredient_two_id" = "ingredients"."id"
    WHERE "pairings"."ingredient_one_id" = $1;
    `
    const values = [id];
    pool.query(queryText, values)
        .then(response => {
            console.log('response from GET pairings: ', response);
            res.send(response.rows)
        }).catch(err => {
            console.log('Error on GET pairings: ', err);
            res.sendStatus(500);
        })
})

module.exports = router;
