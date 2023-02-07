const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const { createOrderFromCart } = require('../Controllers/order-controllers/createOrderFromCart.js');
const { createOrderFromProduct} = require('../Controllers/order-controllers/createOrderFromProduct.js');

router.post('/createOrder/:cartId', auth.verify, createOrderFromCart);
router.post('/createOrderProduct/:productId', auth.verify, createOrderFromProduct);


module.exports = router;
