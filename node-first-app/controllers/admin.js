const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        editing: false,
        docTitle: 'Admin - Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    // req.user.create({
    req.user.createProduct({ // createProduct is a magic method created by the relation
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
        // userId: req.user.id
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(e => {
        console.error(e);
    });
};

exports.getEditProduct = (req, res, next) => {
    const { productId } = req.params;

    // Using a query parameter
    const editing = req.query.edit;

    if (!editing) {
        return res.redirect('/products');
    }

    Product.findByPk(productId).then(product => {
        if (!product) {
            return res.redirect('/admin/products');
        }

        res.render('admin/edit-product', {
            product,
            editing: true,
            docTitle: `Edit - ${product.title}`,
            path: '/admin/edit-product'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.postEditProduct = (req, res, next) => {
    Product.update({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(e => {
        console.error(e);
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;

    Product.destroy({
        where: {
            id: productId
        }
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(e => {
        console.error(e);
    });

    // Product.findByPk(productId).then(product => {
    //     return product.destroy();
    // }).then(() => {
    //     res.redirect('/admin/products');
    // }).catch(e => {
    //     console.error(e);
    // });
};

exports.getProducts = (req, res, next) => {
    // Product.findAll().then((products) => {
    req.user.getProducts().then((products) => { // Will only show products linked to the user
        res.render('admin/product-list', {
            products: products,
            hasProducts: products.length > 0,
            docTitle: 'Admin - Products',
            path: '/admin/products'
        });
    }).catch(e => {
        console.error(e);
    });
};
