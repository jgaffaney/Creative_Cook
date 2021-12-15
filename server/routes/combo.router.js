const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
    let id = req.user.id;
    let ingredientList;
    let name;

    const queryText = `
        INSERT INTO "combos" ("user_id", "ingredient_list", "name")
        VALUES ('1', '{4,7,2}', 'Potatoes, Sugar, Asparagus');
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
