const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// Combo GET route
router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "combos"
        ORDER BY "id";
        `;
    pool.query(queryText)
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
        VALUES ($1, $2, $3);
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
