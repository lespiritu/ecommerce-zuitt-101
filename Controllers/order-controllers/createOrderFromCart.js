const Order = require('../../Models/ordersSchema.js');
const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');
const Product = require('../../Models/productsSchema.js');

module.exports.createOrderFromCart = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;
    const input = request.body;

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"Admin doesn't have an access in add to cart!"
        })
    }
    else{

        Cart.findById(cartId)
        .then( data => {
            if(data === null){
                response.send({
                    "status":"failed",
                    "message":"Invalid Cart ID"
                })
            }

            
            else{   

                if(data.userId !== userData._id){
                    response.send({
                        "status":"failed",
                        "message":"You don't have permission to this page!"
                    })
                }
                else{
                    Product.findById(data.productId)
                    .then( result => {
                        if(!result.isActive){
                            response.send({
                                "status":"failed",
                                "message":"This product is not yet active or no available stocks right now!"
                            })
                        }
                        else{
                            if (result.stocks >= data.quantity){
                            

                                let newOrder = new Order(
                                    {
                                        userId: data.userId,
                                        userEmail: data.userEmail,
                        
                                        productId: data.productId,
                                        productName: data.productName,
                                        image: data.image,
                                        productDescription: data.productDescription,
                                        price: data.price,
                                        quantity: input.quantity,
                                        totalAmount:input.quantity * data.price
                                    }
                                );
    
                                result.stocks -= data.quantity;
                                result.save()
                                .then(
                                    //This will delete the data from a cart.
                                    data.delete())
                                    .catch(error=>response.send({
                                        "status":"failed",
                                        "message":"Error",
                                        error
                                    }))
                                
                
                                .then( ()=> {
                
                                    // This will save new Order to the orders collection
                                    newOrder.save()
                                    .then(result => response.send({
                                        "status":"success",
                                        "message":"Successfully Added Order from cart!",
                                        result
                                    }))
                                    .catch(error => response.send({
                                        "status":"failed",
                                        "message":"Error",
                                        error
                                    }))
                                }
                                )
                                .catch(error => response.send({
                                    "status":"failed",
                                    "message":"Error",
                                    error
                                }))
    
                            }
                            else {
                                response.send({
                                    "status":"failed",
                                    "message":"We don't have enought stock for your order!",
                          
                                })
                            }
                        }

                       
                        
            
                    })
                    .catch(error => response.send({
                        "status":"failed",
                        "message":"Error",
                        error
                    }));
                }
                  

            }
        })
        .catch(error => response.send({
            "status":"failed",
            "message":"Error",
            error
        }));

        

    }

}