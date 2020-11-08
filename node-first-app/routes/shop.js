const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

// get uses exact match
router.get('/', (req, res, next) => {
    // res.send('<h1>First App</h1>');
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;