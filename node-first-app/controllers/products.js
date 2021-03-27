const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll(products => {
        res.render('shop', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Shop',
            path: '/',
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        activeForm: true,
        productCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    res.redirect('/');
};
