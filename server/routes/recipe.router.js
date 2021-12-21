const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

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
  let id = req.user.id;
  let url = req.body.url;
  let image = req.body.image;
  // ingredientList is the start of arr of ID's to send to DB ... looks like {1,2,3}
  let ingredientList = '{';
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
  ingredientLister(combo);

  
  // POST route code here
});

module.exports = router;
