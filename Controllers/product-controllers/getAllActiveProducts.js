
const Product = require('../../Models/productsSchema.js');

module.exports.getAllActiveProducts = (request, response)=>{
    
    Product.find({isActive:true})
    .then(result => {
        response.send(result)
    })
}