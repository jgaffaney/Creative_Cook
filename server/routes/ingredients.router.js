const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const fastcsv = require('fast-csv');
const csv = require('csv-parser');
const copyFrom = require('pg-copy-streams').from;

// request all ingredients from DB
router.get('/', (req, res) => {
    console.log('in ingredients GET');
    const queryText = `
    SELECT id, INITCAP("ingredients"."name") AS name, description, pic, taste, season, weight, volume, type FROM ingredients
    ORDER BY name;
    `
    pool.query(queryText)
        .then(response => {
            // console.log('Response from GET ingredients DB: ', response.rows);
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
    INSERT INTO ingredients ("name", "description", "pic", "taste", "season", "weight", "volume", "type", "function", "technique", "botanical_relative")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, &9, &10, &11);
    `
    const values = [req.body.name, req.body.description, req.body.pic, req.body.taste,
    req.body.season, req.body.weight, req.body.volume, req.body.type, 
    req.body.function, req.body.technique, req.body.botanicalRelative];
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
router.post('/bulk/', upload.single('file'), (req, res) => {
    console.log('in bulk post with: ', req.file);

    pool.connect(function (err, client, done) {
        let stream = client.query(copyFrom(`
        COPY ingredients (name, description, pic, taste, weight, volume, season, function, type, technique, botanical_relative) FROM STDIN DELIMITER ',' CSV HEADER;
        `));
        let fileStream = fs.createReadStream(req.file.path);
        // fileStream.on('error', done)
        // stream.on('error', done)
        stream.on('finish', function (err, result) {
            if(err) {
                console.log('this is a stream error:', err);
            } else {
                console.log('upload successful');
                res.sendStatus(200);
            }
        });
        fileStream.pipe(stream);
    })
});

// ingredient Metrics GET route
router.get('/metrics', (req, res) => {
    const queryText = `
          SELECT COUNT(DISTINCT ingredient) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 week') AS weekly,
          COUNT(DISTINCT ingredient) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 month') AS monthly,
          COUNT(DISTINCT ingredient) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 year') AS yearly
          FROM combos, unnest(ingredient_list) AS ingredient;    
        `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error in ingredient GET', err);
            res.sendStatus(500);
        })
  }); // End GET

  router.delete('/:id', (req, res) => {
      const id = req.params.id
      const queryText = `
      DELETE FROM ingredients
      WHERE id = $1;
      `
      pool.query(queryText, [id])
      .then(response => {
          console.log('Delete response: ', response);
          res.sendStatus(204)          
      }).catch(err => {
          console.log('Error on delete: ', err);
          res.sendStatus(500);
      })
  })

module.exports = router;
