const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  // destructuring the params into the first, second, and 3rd ingredients
  console.log('req.query:', req.query);
  const { first, second, third, health } = req.query;
  // creating a string using 3 ingredients for get request
  let searchString = `${first}, ${second}, ${third}`;
  let healthFilter = '';
  // if a health filter is received by server, add string to URL
  if(health != ''){
    healthFilter = `&health=${health}`
  }
  console.log('searchString is', searchString);

  axios.get(`https://api.edamam.com/api/recipes/v2?app_key=${process.env.APP_KEY}&app_id=${process.env.APP_ID}&type=public&q=${searchString}${healthFilter}`)
    .then(response => {
      console.log('response is', response);
      res.send(response.data);
    })
    .catch(err => {
      console.log('err in recipe GET', err);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/user', rejectUnauthenticated, (req, res) => {
  console.log('inside recipe router POST');
  let combo = req.body.combo;
  console.log('this is combo', combo);
  let userId = req.user.id;
  let url = req.body.recipe.url;
  // let image = req.body.image;
  let label = req.body.recipe.label;
  let name = '';
  // ingredientList is the start of arr of ID's to send to DB ... looks like {1,2,3}
  let ingredientList = '{';
  // ingredientLister created an array of ingredient ID's to store in DB
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

  // comboNamer creates a default string using the 3 ingredient names
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
  ingredientLister(combo);
  comboNamer(combo);

  // values to send to DB for combo query
  let comboValues = [userId, ingredientList, name]
  // values to send to DB for recipe query
  // let recipeValues = [createdComboId, userId, url, label]

  // query to check DB if saved combo exists
  const ifExistsQuery = `
  SELECT "combos".id, "combos".user_id, "combos".ingredient_list, "combos".name FROM "combos"
  WHERE "combos".user_id = $1 AND "combos".ingredient_list = $2 AND "combos".name = $3;
  `;
  // query to save non existing combo to DB
  const insertComboQuery = `
        INSERT INTO "combos" ("user_id", "ingredient_list", "name", "date_created")
        VALUES ($1, $2, $3, NOW())
        RETURNING "id";
        `;
  // query to save recipe to saved combo
  const insertRecipeQuery = `
          INSERT INTO "recipes" ("combo_id", "user_id", "url", "label", "made_on")
          VALUES  ($1, $2, $3, $4, NOW());
          `;

  pool.query(ifExistsQuery, comboValues)
    .then(result => {
      if (result.rows.length >= 1) {
        // let existingComboId = result.rows[0].id;
        pool.query(insertRecipeQuery, [result.rows[0].id, userId, url, label])
        .then(result => {
          res.sendStatus(201);
        }).catch(err => {
          console.log('err', err);
          res.sendStatus(500);
        })
        
      } else if (result.rows.length === 0){ // if no existing combo comes back from DB, save combo then recipe
       pool.query(insertComboQuery, comboValues)
       .then(result => {
        pool.query(insertRecipeQuery, [result.rows[0].id, userId, url, label])
        .then(result => {
          res.sendStatus(201);
        }).catch(err => {
          console.log('err', err);
          res.sendStatus(500);
        }) // .catch for insertRecipeQuery
       }).catch(err => {   // end .then for insertComboQuery
        console.log('err', err);
        res.sendStatus(500);
      })     
    } // close else if
  } 
    ).catch(err => { // close ifExist .then
      console.log('err', err);
      res.sendStatus(500);
    })
  
    
  




});

// userRecipes GET route
router.get('/userRecipes', rejectUnauthenticated, (req, res) => {
  const queryText = `
      SELECT * FROM "recipes"
      WHERE "user_id" = $1;
      `;
  pool.query(queryText, [req.user.id])
      .then(result => {
          res.send(result.rows); // Contains all combos
      })
      .catch(err => {
          console.log('Error in userRecipe GET', err);
          res.sendStatus(500);
      })
}); // End GET

router.put('/:id', (req, res) => {
  console.log('req', req.body);
  
  let id = req.params.id;
  const queryText = `
    UPDATE recipes
    SET made_on = NOW(), is_cooked = TRUE
    WHERE id = $1;  
  `;
  pool.query(queryText, [req.body.recipe.id])
      .then(response => {
          res.sendStatus(200)
      }).catch(err=> {
          console.log('Error on recipe PUT: ', err);
          res.sendStatus(500);
      })
})

// Recipe Metrics GET route
router.get('/metrics', rejectUnauthenticated, (req, res) => {
  const queryText = `
        SELECT COUNT(DISTINCT url) FILTER (WHERE "user_id" = $1 AND is_cooked = true AND "made_on" >= now() - interval '1 week') AS weekly,
        COUNT(DISTINCT url) FILTER (WHERE "user_id" = $1 AND is_cooked = true AND "made_on" >= now() - interval '1 month') AS monthly,
        COUNT(DISTINCT url) FILTER (WHERE "user_id" = $1 AND is_cooked = true AND "made_on" >= now() - interval '1 year') AS yearly
        FROM recipes;
      `;
  pool.query(queryText, [req.user.id])
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.log('Error in Recipe GET', err);
          res.sendStatus(500);
      })
}); // End GET

module.exports = router;
