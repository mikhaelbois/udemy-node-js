const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.get('/product-list', shopController.getProducts);

module.exports = router;