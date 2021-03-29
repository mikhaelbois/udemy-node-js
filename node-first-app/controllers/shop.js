const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render('shop/index', {
            products: rows,
            hasProducts: rows.length > 0,
            docTitle: 'Shop',
            path: '/'
        });
    }).catch(e => {
        console.error(e.sqlMessage);
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll().then(([rows]) => {
            const cartData = [];

            for (product of rows) {
                const cartProductData = cart.products.find(p => p.id === product.id);
                if (cartProductData) {
                    cartData.push({ product, qty: cartProductData.qty });
                }
            }

            res.render('shop/cart', {
                cartData,
                hasProducts: cartData.length > 0,
                docTitle: 'Cart',
                path: '/cart'
            });
        }).catch(e => {
            console.error(e.sqlMessage);
        });
    });
};

exports.postCart = (req, res, next) => {
    const { productId, action } = req.body;

    Product.findById(productId, product => {
        if (action === 'add') {
            Cart.addProduct(productId, product.price);
        } else if (action === 'remove') {
            Cart.deleteProduct(productId, product.price);
        }

        res.redirect('/cart');
    });
};

exports.getCheckout = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render('shop/checkout', {
            products: rows,
            hasProducts: rows.length > 0,
            docTitle: 'Checkout',
            path: '/checkout'
        });
    }).catch(e => {
        console.error(e.sqlMessage);
    });
};

exports.getOrders = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render('shop/orders', {
            products: rows,
            hasProducts: rows.length > 0,
            docTitle: 'Orders',
            path: '/orders'
        });
    }).catch(e => {
        console.error(e.sqlMessage);
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([rows]) => {
        res.render('shop/product-list', {
            products: rows,
            hasProducts: rows.length > 0,
            docTitle: 'Products',
            path: '/products'
        });
    }).catch(e => {
        console.error(e.sqlMessage);
    });
};

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;

    Product.findById(productId).then(([[rows]]) => {
        res.render('shop/product-detail', {
            product: rows,
            docTitle: rows.title,
            path: '/products'
        });
    }).catch(e => {
        console.error(e.sqlMessage);
    });
};
