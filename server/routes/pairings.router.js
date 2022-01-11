const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;


router.get('/:id', (req, res) => {
    // console.log('params in pairings GET: ', req.params.id);
    const id = req.params.id;
    const queryText = `
    SELECT "ingredients"."id", INITCAP("ingredients"."name") AS name FROM "ingredients"
    JOIN "pairings" ON "pairings"."ingredient_two_id" = "ingredients"."id"
    WHERE "pairings"."ingredient_one_id" = $1
    UNION
    SELECT "ingredients"."id", INITCAP("ingredients"."name") AS name FROM "ingredients"
    JOIN "pairings" ON "pairings"."ingredient_one_id" = "ingredients"."id"
    WHERE "pairings"."ingredient_two_id" = $1
    ORDER BY name;
    `
    const values = [id];
    pool.query(queryText, values)
        .then(response => {
            // console.log('response from GET pairings: ', response);
            res.send(response.rows)
        }).catch(err => {
            // console.log('Error on GET pairings: ', err);
            res.sendStatus(500);
        })
})

router.post('/:id', (req, res) => {
    // console.log('params in pairings POST: ', req.params.id);
    // console.log('req.body in pairings POST: ', req.body.pair);
    const queryText = `
    INSERT INTO pairings ("ingredient_one_id", "ingredient_two_id")
    VALUES ($1, $2)
    `
    const values = [req.params.id, req.body.pair];
    pool.query(queryText, values)
        .then(response=> {
            // console.log('response from pairing POST: ', response);
            res.sendStatus(200)
        }).catch(err => {
            // console.log('Error on POST: ', err);
            res.sendStatus(500);
        })
})

router.delete('/', (req, res) => {
    // console.log('params in pairings DELETE: ', req.params.id);
    // console.log('req.body in pairings DELETE: ', req.body);
    const queryText = `
    DELETE FROM pairings
    WHERE ingredient_one_id = $1 AND ingredient_two_id = $2 OR
    (ingredient_one_id = $2 AND ingredient_two_id = $1);
    `
    const values = [req.body.pair, req.body.del];
    pool.query(queryText, values)
        .then(response => {
            // console.log('response from pairing DELETE: ', response);
            res.sendStatus(204)
        }).catch(err => {
            // console.log('Error on Delete: ', err);
            res.sendStatus(500);
        })

})

module.exports = router;
