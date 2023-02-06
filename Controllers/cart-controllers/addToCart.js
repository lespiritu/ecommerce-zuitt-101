const Cart = require('../../Models/cartsSchema.js');
const User = require('../../Models/usersSchema.js');
const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js');



module.exports.addToCart = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId; 
    const input = request.body;

    if(userData.isAdmin){
        response.send("This page is restricted for users only. Admin is not allowed!")
    }
    else{

        Cart.findOneAndUpdate( {$and:[{userId: userData._id  }, {productId: productId}]},{$inc:{quantity:input.quantity? input.quantity : 1} } , {new:true})
        .then(data => {
            if(data !== null){
               data.totalAmount = data.price * data.quantity;
               data.save()

               .then(newData =>response.send(newData) )
               .catch(error => respond.send(error))
            }
            else{
                Product.findById(productId)
                .then(result => {
                    if(result === null){
                        response.send("Invalid productID!")
                    }
            
                    else{
                        let newProductOnCart = new Cart(
                            {   

                                userId: userData._id,
                                userEmail: userData.email,

                                productId: result._id,
                                productName: result.productName,
                                productDescription: result.productDescription,
                                price: result.price,
                                quantity: input.quantity? input.quantity : 1,
                                totalAmount:input.quantity? result.price * input.quantity : result.price * 1
                                    
                                
                                
                            }
                        )


                        // This will add and save the new product in the cart to database cart collection
                        return newProductOnCart.save()
                        .then(result => response.send(`${result.productName} is now on your cart`))
                        .catch(error=>response.send(error))
                    }
                })
                .catch(error => response.send(error))
            }
        })

        .catch(error=> response.send(error))

        
    }
}
