const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        editing: false,
        docTitle: 'Admin - Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        id = null,
        title = req.body.title,
        imageUrl = req.body.imageUrl,
        description = req.body.description,
        price = req.body.price
    );
    product.save();

    res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
    const { productId } = req.params;

    // Using a query parameter
    const editing = req.query.edit;

    if (!editing) {
        return res.redirect('/products');
    }

    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/admin/products');
        }

        res.render('admin/edit-product', {
            product,
            editing: true,
            docTitle: `Edit - ${product.title}`,
            path: '/admin/edit-product'
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const product = new Product(
        id = req.body.id,
        title = req.body.title,
        imageUrl = req.body.imageUrl,
        description = req.body.description,
        price = req.body.price
    );
    product.save();

    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;

    Product.deleteById(productId, () => {
        res.redirect('/admin/products');
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Admin - Products',
            path: '/admin/products'
        });
    });
};
