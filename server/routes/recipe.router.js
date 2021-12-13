const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('app_key', process.env.app_key);
  console.log('app_id', process.env.app_id);
  
  
  axios.get(`https://api.edamam.com/api/recipes/v2?app_key=${process.env.app_key}&app_id=${process.env.app_id}&type=public&q=chicken`)
//   axios.get(`https://api.edamam.com/api/recipes/v2?app_key=8c0986b8e9521ffff067fac51e04341b&app_id=3b8d7964&type=public&q=chicken`)
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
