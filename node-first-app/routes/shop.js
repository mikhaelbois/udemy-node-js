const express = require('express');
const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const { products } = adminData;
    res.render('shop', { products, hasProducts: products.length > 0, docTitle: 'Shop', path: '/', activeShop: true, productCSS: true }); // Will use defined templating engine in app.js
});

module.exports = router;