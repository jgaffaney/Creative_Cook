const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// combo get pairings relevant to searched ingredient
router.get('/pairings', rejectUnauthenticated, (req, res) => {
    console.log('params in pairings GET: ', req.params.id);
    const id = req.params.id;
    const queryText = `
    SELECT "ingredients"."id", "ingredients"."description", "ingredients"."pic", INITCAP("ingredients"."name") AS name FROM "ingredients"
    JOIN "pairings" ON "pairings"."ingredient_two_id" = "ingredients"."id"
    WHERE "pairings"."ingredient_one_id" = $1
    UNION
    SELECT "ingredients"."id", "ingredients"."description", "ingredients"."pic", INITCAP("ingredients"."name") AS name FROM "ingredients"
    JOIN "pairings" ON "pairings"."ingredient_one_id" = "ingredients"."id"
    WHERE "pairings"."ingredient_two_id" = $2;
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
}); // End GET


// Combo GET route
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT * FROM "combos"
        WHERE "user_id" = $1
        ORDER BY "id" DESC;
        `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows); // Contains all combos
        })
        .catch(err => {
            console.log('Error in Combo GET', err);
            res.sendStatus(500);
        })
}); // End GET

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    console.log('hello from combo post');
    let id = req.user.id;
    let ingredientList = '{';
    let name = '';

    // this creates the id object for DB
    const ingredientLister = (combo) => {
        console.log('in ingredientLister');
        // loop through ingredients, add the id of each to string
        for (let ingredient of combo) {
            ingredientList += `${ingredient.id},`
        }
        // chop off the last character from the string and add closing curly
        ingredientList = ingredientList.slice(0, -1)
        ingredientList += `}`;
        console.log('ingredientList is', ingredientList);
    } // end ingredientLister

    //this creates the default name string to send to DB
    const comboNamer = (combo) => {
        console.log('in comboNamer');
        // loop through ingredients, add the name of each to string
        for (let ingredient of combo) {
            name += `${ingredient.name}, `
        }
        // chop off the last two characters from the string for clean up
        name = name.slice(0, -2)
        console.log('name is', name);
    } // end comboNamer
    
    // call comboNamer and ingredientLister with req.body to format for DB
    comboNamer(req.body);
    ingredientLister(req.body);

    const queryText = `
        INSERT INTO "combos" ("user_id", "ingredient_list", "name")
        VALUES ($1, $2, $3)
        RETURNING "id";
        `;
    let values = [id, ingredientList, name]
    pool.query(queryText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(500);
        })
});

module.exports = router;
