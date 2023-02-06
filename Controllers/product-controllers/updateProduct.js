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
        price:input.price
    }

    if(userData.isAdmin){
        Product.findByIdAndUpdate(productId, toUpdateProduct, {new:true})           
        .then(result => response.send(result))
        .catch(error=> response.send(error))
    }
    
    else{
        response.send(`You are not allowed to update product information!`)
    }
    
}

