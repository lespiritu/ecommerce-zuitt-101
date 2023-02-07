const Order = require('../../Models/ordersSchema.js');
const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');
const Product = require('../../Models/productsSchema.js');

module.exports.createOrder = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const cartId = request.params.cartId;

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{

        Cart.findById(cartId)
        .then( data => {
            if(data === null){
                response.send("Invalid cartId")
            }

            
            else{   

                  


                let newOrder = new Order(
                    {
                        userId: data.userId,
                        userEmail: data.userEmail,
        
                        productId: data.productId,
                        productName: data.productName,
                        productDescription: data.productDescription,
                        price: data.price,
                        quantity: data.quantity,
                        totalAmount:data.totalAmount
                    }
                );
                
                //This will delete the data from a cart.
                data.delete()

                .then( ()=> {

                    // This will save new Order to the orders collection
                    newOrder.save()
                    .then(saveData => response.send(`${saveData.productName} is now on going process. Thank you for your order!`))
                    .catch(error => response.send(error))
                }
                )
                .catch(error => response.send(error))
                
               
            }
        })
        .catch(error => response.send(error));

        

    }

}