const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    // res.send(`
    //     <html>
    //         <head><title>Add product</title></head>
    //         <body>
    //             <h1>Add product</h1>
    //             <form action="/admin/add-product" method="POST">
    //                 <input type="text" name="title" />
    //                 <button type="submit">Send</button>
    //             </form>
    //         </body>
    //     </html>
    // `);
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

// router.get('/product', (req, res, next) => {});
// router.patch('/product', (req, res, next) => {});
// router.put('/product', (req, res, next) => {});

module.exports = router;