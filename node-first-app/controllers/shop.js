const Cart = require('../models/cart');
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartData = [];

            for (product of products) {
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
            path: '/products'
        });
    });
};

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;

    Product.findById(productId, product => {
        res.render('shop/product-detail', {
            product,
            docTitle: product.title,
            path: '/products'
        });
    });
};
