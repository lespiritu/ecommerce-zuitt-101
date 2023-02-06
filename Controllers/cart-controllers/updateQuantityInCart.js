const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');


module.exports.updateQuantity = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;
    const input = request.body;

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{
        Cart.findById(cartId)
        .then(data => {
            if(data === null){
                response.send("Invalid CartId!")
            }
            else{
               data.quantity = input.quantity ? input.quantity : 1;
               data.totalAmount = data.price * data.quantity;

               data.save()
               .then(result => response.send(result))
               .catch(error => response.send(error))
            }
        })
        .catch(error => response.send(error))

    }
}