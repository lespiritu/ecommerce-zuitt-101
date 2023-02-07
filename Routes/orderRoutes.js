const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const { createOrder } = require('../Controllers/order-controllers/createOrder.js');


router.post('/createOrder/:cartId', auth.verify, createOrder)


module.exports = router;
