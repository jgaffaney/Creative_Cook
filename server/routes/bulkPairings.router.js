const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

router.post('/', upload.any(), (req, res) => {
    console.log('in bulk pairings post with file: ', req.files);
    
})

module.exports = router;