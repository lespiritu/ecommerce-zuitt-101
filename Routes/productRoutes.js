const express = require('express')
const router = express.Router();
//use for authentication
const auth = require('../auth.js')



const {addProduct} = require('../Controllers/product-controllers/addProduct.js');
const {getAllActiveProducts} = require('../Controllers/product-controllers/getAllActiveProducts.js');
const {getSingleActiveProduct, getSingleProduct} = require('../Controllers/product-controllers/getSingleProduct.js');
const {updateProduct} = require('../Controllers/product-controllers/updateProduct.js');
const { getAllProducts, getInActiveProducts} = require('../Controllers/product-controllers/getAllProducts.js');
const { deactivatedProduct } = require('../Controllers/product-controllers/deactivatedProduct.js');

// ============= all request route here ===============================================
router.post('/addProduct',auth.verify, addProduct);
router.get('/allActiveProducts', getAllActiveProducts);
router.get('/productIdActive/:id',getSingleActiveProduct );

router.put('/update/:productId', auth.verify, updateProduct);
router.get('/allProducts',auth.verify, getAllProducts );
router.get('/inActiveProducts', auth.verify, getInActiveProducts);
router.get('/productId/:productId', auth.verify, getSingleProduct);
router.put('/deactivatedProduct/:productId', auth.verify, deactivatedProduct);

module.exports = router;