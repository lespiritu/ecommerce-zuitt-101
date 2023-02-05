const express = require('express')
const router = express.Router();
//use for authentication
const auth = require('../auth.js')



const {addProduct} = require('../Controllers/product-controllers/addProduct.js');
const {getAllActiveProducts} = require('../Controllers/product-controllers/getAllActiveProducts.js');
const {getSingleProduct} = require('../Controllers/product-controllers/getSingleProduct.js');
const {updateProduct} = require('../Controllers/product-controllers/updateProduct.js');

// ============= all request route here ===============================================
router.post('/addProduct',auth.verify, addProduct);
router.get('/allActiveProducts', getAllActiveProducts);
router.get('/:id',getSingleProduct );
router.put('/update/:productId', auth.verify, updateProduct)


module.exports = router;