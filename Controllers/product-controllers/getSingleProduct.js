const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js');

// this is for getting active product only
module.exports.getSingleActiveProduct = (request, response)=>{

    Product.findById(request.params.id)
    .then(result => {
        if(result !== null && result.isActive === true){
            response.send(result)
        }
        else{
            response.send(`Doesn't have data from id or product id is incorect!`)
        }
    })
    .catch(error=> response.send(`Doesn't have data from id or product id is incorect! ${error}`))
}


// this will get active or inactive product access by admin only

module.exports.getSingleProduct = (request, response)=>{

    const productId = request.params.productId;
    const userData  = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        Product.findById(productId)
        .then(result => {
            response.send(result)
        })
        .catch(error => response.send(error))
    }
    else{
        response.send("You don't have permission to this page!")
    }
    
}