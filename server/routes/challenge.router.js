const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Challenge GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT 	"feed_content"."id", "feed_content"."type", "feed_content"."description", 
                "feed_content"."combo_id", "feed_content"."date_posted", "combos"."user_id", "combos"."ingredient_list", "combos"."name" 
        FROM 	"feed_content"
        JOIN 	"combos" 
        ON 		"combos"."id" = "feed_content"."combo_id"
        ORDER BY "feed_content"."id" DESC ; `;
        
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
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        INSERT INTO "feed_content" 
            ("type", "description", "combo_id")
        VALUES 
            ($1, $2, $3); `;

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


// DELETE challenge rote // 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // DELETE route code here
    console.log('----- in router.DELETE /api/challenge/:id');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('router.DELETE /api/challenge/:id req.user:', req.user);
    console.log('delete.router req.params.id:'), req.params.id;


    let queryText = `
        DELETE 	FROM "feed_content"
        WHERE 	"id" = $1;` ;

    const values = [req.params.id]

    pool.query(queryText, values)
        .then(response => {
            console.log('response from router.delete /api/challenge/:id:', response);
            res.sendStatus(204)
        }).catch(error => {
            console.log('ERROR router.DELETE /api/challenge/:id', error);
            res.sendStatus(500);
        });
});

module.exports = router;
