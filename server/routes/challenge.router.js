const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Challenge GET route
router.get('/', (req, res) => {
    const queryText = `
        SELECT "feed_content"."id", "type", "description", "combo_id", "user_id", "ingredient_list", "name" FROM "feed_content"
        JOIN "combos" ON "combos"."id" = "feed_content"."combo_id"
        ORDER BY "feed_content"."id" DESC;
        `;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows); // Contains all previous challenges
        })
        .catch(err => {
            console.log('Error in Challenge GET', err);
            res.sendStatus(500);
        })
}); // End GET


// Challenge POST route
router.post('/', (req, res) => {
    const queryText = `
        INSERT INTO "feed_content" ("type", "description", "combo_id")
        VALUES ($1, $2, $3);
        `;
    values = [req.body.type, req.body.description, req.body.combo_id]
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
