const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  // destructuring the params into the first, second, and 3rd ingredients
  console.log('req.query:', req.query);
  const { first, second, third } = req.query;
  // creating a string using 3 ingredients for get request
  let searchString = `${first}, ${second}, ${third}`;
  console.log('searchString is', searchString);

  axios.get(`https://api.edamam.com/api/recipes/v2?app_key=${process.env.APP_KEY}&app_id=${process.env.APP_ID}&type=public&q=${searchString}`)
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
router.post('/user', (req, res) => {
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
  const insertComboQuery = `
        INSERT INTO "combos" ("user_id", "ingredient_list", "name")
        VALUES ($1, $2, $3)
        RETURNING "id";
        `;
  // first Query saves combo
  let comboValues = [userId, ingredientList, name]
  pool.query(insertComboQuery, comboValues)
    .then(result => {

      console.log('New Combo Id:', result.rows[0].id); //ID IS HERE!

      const createdComboId = result.rows[0].id

      // Now handle saving recipe
      const insertRecipeQuery = `
      INSERT INTO "recipes" ("combo_id", "user_id", "url", "label")
      VALUES  ($1, $2, $3, $4);
      `
      let recipeValues = [createdComboId, userId, url, label]
      // second query inserts into recipe table
      pool.query(insertRecipeQuery, recipeValues)
        .then(result => {
          // Now that both are done, send back success!
          res.sendStatus(201);
          // res.send(createdComboId);
        })
        // catch for 2nd query
        .catch(err => {
          console.log('err', err);
          res.sendStatus(500);
        })

    })
    // catch for 1st query
    .catch(err => {
      console.log('err', err);
      res.sendStatus(500);
    })
  // POST route code here
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
  let id = req.params.id;
  const queryText = `
    UPDATE recipes
    SET made_on = NOW(), is_cooked = TRUE
    WHERE id = $1;  
  `;
  pool.query(queryText, [id])
      .then(response => {
          res.sendStatus(200)
      }).catch(err=> {
          console.log('Error on recipe PUT: ', err);
          res.sendStatus(500);
      })
})

module.exports = router;
