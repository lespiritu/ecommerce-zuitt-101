const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const addProductToCart = require('../Controllers/cart-controllers/addToCart.js');
const {viewUserCart} = require('../Controllers/cart-controllers/viewUserCart.js');
const {updateQuantity} = require('../Controllers/cart-controllers/updateQuantityInCart.js');
const {deleteProductInCart} = require('../Controllers/cart-controllers/deleteProductInCart.js');

router.post('/addToCart/:productId', auth.verify, addProductToCart.addToCart)
router.get('/viewCart', auth.verify, viewUserCart);
router.put('/updateCart/:cartId', auth.verify, updateQuantity);
router.delete('/deleteProduct/:cartId', auth.verify, deleteProductInCart);

module.exports = router;