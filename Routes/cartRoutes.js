const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const addProductToCart = require('../Controllers/cart-controllers/addToCart.js');

router.post('/addToCart/:productId', auth.verify, addProductToCart.addToCart)


module.exports = router;