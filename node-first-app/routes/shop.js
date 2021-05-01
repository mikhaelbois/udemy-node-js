const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart);
router.post('/cart-add', shopController.postCartAdd);
router.post('/cart-remove', shopController.postCartRemove);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);
router.post('/order-create', shopController.postOrderCreate);

router.get('/products', shopController.getProducts);

// Routes order is important
router.get('/products/:productId', shopController.getProduct);

module.exports = router;