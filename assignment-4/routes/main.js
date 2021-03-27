const path = require('path');
const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
    res.render('main', { docTitle: 'Assignement - 4', path: '/', activeHome: true });
});

module.exports = router;