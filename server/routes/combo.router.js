const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET pairings relevant to searched ingredient
 */
router.get('/pairings/:id', rejectUnauthenticated, (req, res) => {
    // console.log('params in combo/pairings GET: ', req.params.id);
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
    const values = [id, id];
    pool.query(queryText, values)
        .then(response => {
            // console.log('response from GET pairings: ', response);
            res.send(response.rows)
        }).catch(err => {
            // console.log('Error on GET pairings: ', err);
            res.sendStatus(500);
        })
}); // End GET

/**
 * GET all saved combo by user route
 */
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
            // console.log('Error in Combo GET', err);
            res.sendStatus(500);
        })
}); // End GET


/**
 * POST combo route by user
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    // console.log('hello from combo post');
    let userId = req.user.id;
    let ingredientList = '{';
    let name = '';

    // this creates the id object for DB
    const ingredientLister = (combo) => {
        // console.log('in ingredientLister');
        // loop through ingredients, add the id of each to string
        for (let ingredient of combo) {
            ingredientList += `${ingredient.id},`
        }
        // chop off the last character from the string and add closing curly
        ingredientList = ingredientList.slice(0, -1)
        ingredientList += `}`;
        // console.log('ingredientList is', ingredientList);
    } // end ingredientLister

    //this creates the default name string to send to DB
    const comboNamer = (combo) => {
        // console.log('in comboNamer');
        // loop through ingredients, add the name of each to string
        for (let ingredient of combo) {
            name += `${ingredient.name}, `
        }
        // chop off the last two characters from the string for clean up
        name = name.slice(0, -2)
        // console.log('name is', name);
    } // end comboNamer

    // call comboNamer and ingredientLister with req.body to format for DB
    comboNamer(req.body);
    ingredientLister(req.body);

    const ifExistsQuery = `
  SELECT "combos".id, "combos".user_id, "combos".ingredient_list, "combos".name FROM "combos"
  WHERE "combos".user_id = $1 AND "combos".ingredient_list = $2 AND "combos".name = $3;
  `;

    const insertComboQuery = `
        INSERT INTO "combos" ("user_id", "ingredient_list", "name", "date_created")
        VALUES ($1, $2, $3, NOW());
        `;
    let comboValues = [userId, ingredientList, name]
    pool.query(ifExistsQuery, comboValues)
    .then(result => {
        if (result.rows.length >= 1) {
            res.sendStatus(201);
        } else if (result.rows.length === 0){ // if no existing combo comes back from DB, save combo then recipe
            pool.query(insertComboQuery, comboValues)
            .then(result => {
                res.sendStatus(201)
            })
            .catch(err => {
                res.sendStatus(500);
            })
        }
    })
    .catch(err => {
        res.sendStatus(500)
    })

});

/**
 * GET combo metrics
 */
router.get('/metrics', rejectUnauthenticated, (req, res) => {
    const queryText = `
          SELECT COUNT(DISTINCT name) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 week') AS weekly,
          COUNT(DISTINCT name) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 month') AS monthly,
          COUNT(DISTINCT name) FILTER (WHERE "user_id" = $1 AND "date_created" >= now() - interval '1 year') AS yearly
          FROM combos;
        `;
    pool.query(queryText, [req.user.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            // console.log('Error in Combo GET', err);
            res.sendStatus(500);
        })
}); // End GET

module.exports = router;
