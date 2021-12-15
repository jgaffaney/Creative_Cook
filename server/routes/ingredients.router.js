const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// request all ingredients from DB
router.get('/', (req, res) => {
    console.log('in ingredients GET');
    const queryText = `
    SELECT * FROM ingredients;
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

module.exports = router;
