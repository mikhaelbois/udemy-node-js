const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Admin - Add Product',
        path: '/admin/add-product'
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Admin - Products',
            path: '/admin/product-list'
        });
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    product.save();

    res.redirect('/product-list');
};
