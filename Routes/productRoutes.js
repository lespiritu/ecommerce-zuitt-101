const express = require('express')
const router = express.Router();
//use for authentication
const auth = require('../auth.js')



const productController = require('../Controllers/product-controllers/addProduct.js')




// ============= all request route here ===============================================
router.post('/addProduct',auth.verify, productController.addProduct);


module.exports = router;