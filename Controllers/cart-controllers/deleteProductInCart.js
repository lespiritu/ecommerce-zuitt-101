const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');

module.exports.deleteProductInCart = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{
        Cart.findByIdAndDelete(cartId)
        .then(result => response.send(result))
        .catch(error => response.send(error))
    }
}