const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// request all ingredients from DB
router.get('/', (req, res) => {
    console.log('in ingredients GET');
    const queryText = `
    SELECT * FROM ingredients
    ORDER BY lower(name);
    `
    pool.query(queryText)
        .then(response => {
            console.log('Response from GET ingredients DB: ', response.rows);
            res.send(response.rows)
        }).catch(err => {
            console.log("Error on GET ingredients from DB: ", err);
            res.sendStatus(500)
        })
});

// posts a new ingredient to DB
router.post('/', (req, res) => {
    console.log('in ingredients POST with: ', req.body);

    const queryText = `
    INSERT INTO ingredients ("name", "description", "pic", "taste", "season", "weight", "volume", "type")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `
    const values = [req.body.name, req.body.description, req.body.pic, req.body.taste,
    req.body.season, req.body.weight, req.body.volume, req.body.type]
    pool.query(queryText, values)
        .then(response => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error on POST ingredients: ', err);
            res.sendStatus(500);
        })
});

router.put('/', (req, res) => {
    console.log('in ingredients POST with: ', req.body);
    const field = req.body.field
    const queryText = `
    UPDATE ingredients
    SET ${field} = $1
    WHERE id = $2
    RETURNING id;
    `
    values = [req.body.value, req.body.id]
    pool.query(queryText, values)
        .then(response => {
            res.send(response)
        }).catch(err => {
            console.log('Error on PUT ingredients: ', err);
            res.sendStatus(500);
        })
})

// GETs top 5 most used ingredients from DB
router.get('/top5', (req, res) => {
    console.log('in top five ingredients GET');
    const queryText = `
        SELECT unnest(combos.ingredient_list) AS ingredient_id, count(*) AS times_used FROM combos
        GROUP BY ingredient_id
        ORDER BY times_used DESC LIMIT 5;
    `;
    pool.query(queryText)
        .then(response => {
            console.log('Response from top five ingredients GET: ', response.rows);
            res.send(response.rows)
        }).catch(err => {
            console.log("Error in top five ingredients GET: ", err);
            res.sendStatus(500)
        })
});

// POSTS bulk ingredients data to DB
router.post('/bulk/', (req, res) => {
    console.log('in bulk post with: ', req.body);
    const queryText = `
    COPY ingredients(name, description, pic, taste, weight, volume, season, type) FROM ${req.body} (DELIMITER ',');
    `;
    pool.query(queryText)
        .then(response => {
            console.log('response from db on bulk copy: ', response);
            
        }).catch(err => {
            console.log('Error from DB on bulk copy: ', err);
        })
});

module.exports = router;
