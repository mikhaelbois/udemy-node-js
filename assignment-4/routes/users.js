const path = require('path');
const express = require('express');
const router = express.Router();

const users = [];

router.post('/users', (req, res, next) => {
    users.push({
        name: req.body.name
    });
});

router.get('/users', (req, res, next) => {
    res.render('users', { docTitle: 'Users', path: '/users', activeUsers: true, users: users });
});

module.exports = router;
