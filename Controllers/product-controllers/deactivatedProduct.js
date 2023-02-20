const Product = require('../../Models/productsSchema.js')
const auth = require('../../auth.js')

module.exports.deactivatedProduct = (request, response) =>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;

    if(!userData.isAdmin){
        response.send({
            "status" : "failed",
            "message": "You are not authorize to add product!"
        })
    }
    else{
        Product.findById(productId)
        .then(data => {
            if( data === null){
                response.send({
                    "status" : "failed",
                    "message": "Invalid Product ID!"
                })
            }
            else{
                data.isActive = !data.isActive;
                data.save()
                .then(updatedData => response.send(updatedData) )
                .catch(error => response.send(error))
            }
        })
        .catch(error => response.send(error))
    }
}