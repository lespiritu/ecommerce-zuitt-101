const User = require('../../Models/usersSchema.js');
const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js');



module.exports.updateProduct = (request, response)=>{
    const input = request.body;
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;

    let toUpdateProduct = {
        productName:input.productName, 
        productDescription:input.productDescription,
        category:input.category,
        isActive:input.isActive,
        stocks:input.stocks,
        price:input.price,
        images:[input.image1, input.image2, input.image3, input.image4]
    }

    if(userData.isAdmin){
        Product.findByIdAndUpdate(productId, toUpdateProduct, {new:true})           
        .then(result => response.send({
            "status":"success",
            "message":"Product are successfully update!",
            result
        }))
        .catch(error=> response.send({
            "status":"failed",
            error
        }))
    }
    
    else{
        response.send({
            "status":"failed",
            "message":"You are not allowed to update product information!"
        })
    }
    
}

