const Product = require('../../Models/productsSchema.js')
const auth = require('../../auth.js')

module.exports.deactivatedProduct = (request, response) =>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;

    if(!userData.isAdmin){
        response.send("You don't have permission to this page!")
    }
    else{
        Product.findById(productId)
        .then(data => {
            if( data === null){
                response.send("Invalid product ID")
            }
            else{
                data.isActive = false;
                data.save()
                .then(updatedData => response.send(updatedData) )
                .catch(error => response.send(error))
            }
        })
        .catch(error => response.send(error))
    }
}