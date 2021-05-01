const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/index', {
            products: products,
            hasProducts: products.length > 0,
            docTitle: 'Shop',
            path: '/'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.getCart = (req, res, next) => {
    req.user.getCart().then(cart => {
        return cart.getProducts();
    }).then(products => {
        res.render('shop/cart', {
            products,
            hasProducts: products.length > 0,
            docTitle: 'Cart',
            path: '/cart'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.postCartAdd = (req, res, next) => {
    const { productId } = req.body;
    let fetchedCart;
    let newQuantity = 1;

    req.user.getCart().then(cart => {
        fetchedCart = cart;

        return cart.getProducts({
            where: {
                id: productId
            }
        });
    }).then(products => {
        let product;

        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;

            return product;
        }

        return Product.findByPk(productId);
    }).then(product => {
        return fetchedCart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        });
    }).then(() => {
        res.redirect('/cart');
    }).catch(e => {
        console.error(e);
    });
};

exports.postCartRemove = (req, res, next) => {
    const { productId } = req.body;

    req.user.getCart().then(cart => {
        return cart.getProducts({
            where: {
                id: productId
            }
        });
    }).then(products => {
        const product = products[0];

        return product.cartItem.destroy();
    }).then(() => {
        res.redirect('/cart');
    }).catch(e => {
        console.error(e);
    });
};

exports.getCheckout = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/checkout', {
            products: products,
            hasProducts: products.length > 0,
            docTitle: 'Checkout',
            path: '/checkout'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({
        include: ['products']
    }).then(orders => {
        res.render('shop/orders', {
            orders: orders.sort((a, b) => a.id - b.id),
            hasOrders: orders.length > 0,
            docTitle: 'Orders',
            path: '/orders'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.postOrderCreate = (req, res, next) => {
    let cartProducts = [];
    let fetchedCart;

    req.user.getCart().then(cart => {
        fetchedCart = cart;

        return cart.getProducts();
    }).then(products => {
        cartProducts = products;

        return req.user.createOrder();
    }).then(order => {
        order.addProducts(cartProducts.map(product => {
            product.orderItem = {
                quantity: product.cartItem.quantity
            };

            return product;
        }));
    }).then(() => {
        return fetchedCart.setProducts(null);
    }).then(() => {
        res.redirect('/checkout');
    }).catch(e => {
        console.error(e);
    });
};

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('shop/product-list', {
            products: products,
            hasProducts: products.length > 0,
            docTitle: 'Products',
            path: '/products'
        });
    }).catch(e => {
        console.error(e);
    });
};

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;

    Product.findByPk(productId).then(product => {
        res.render('shop/product-detail', {
            product,
            docTitle: product.title,
            path: '/products'
        });
    }).catch(e => {
        console.error(e);
    });
};
