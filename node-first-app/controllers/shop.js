const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/cart', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Cart',
            path: '/cart'
        });
    });
};

exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/checkout', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Checkout',
            path: '/checkout'
        });
    });
};

exports.getOrders = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/orders', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Orders',
            path: '/orders'
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Products',
            path: '/product-list'
        });
    });
};
