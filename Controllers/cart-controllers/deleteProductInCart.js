const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');

module.exports.deleteProductInCart = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You don't have access on this page!"
        })
    }
    else{
        Cart.findById(cartId)
        .then(result => {
            if (result === null){
                response.send({
                    "status":"failed",
                     "message":"Invalid Cart ID!"
                })
            }
            else{
                if(result.userId === userData._id){
                    result.delete()
                    .then( data => response.send({
                        "status":"success",
                        "message":"Product has beed deleted on the your cart!",
                        data
                    }))
                    .catch(error => response.send({
                        "status":"failed",
                        "message":"Error during deleting item!",
                        error
                    }))
                }
                else{
                    response.send({
                        "status":"failed",
                        "message":"You can't delete item on another user's cart!",
                    })
                }
            }
        })
        .catch(error => response.send({
            "status":"failed",
            "message":"Error during accessing cart ID!",
            error
        }))
    }
}