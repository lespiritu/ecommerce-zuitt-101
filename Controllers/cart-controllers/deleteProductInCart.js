const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');

module.exports.deleteProductInCart = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{
        Cart.findById(cartId)
        .then(result => {
            if (result === null){
                response.send("Invalid Cart ID")
            }
            else{
                if(result.userId === userData._id){
                    result.delete()
                    .then( ()=> response.send(`${result} \n - is now deleted on your cart`))
                    .catch(error => response.send(error))
                }
                else{
                    response.send("You don't have permission on this page!")
                }
            }
        })
        .catch(error => response.send(error))
    }
}