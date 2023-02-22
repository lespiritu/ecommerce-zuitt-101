const Cart = require('../../Models/cartsSchema.js');
const User = require('../../Models/usersSchema.js');
const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js');



module.exports.addToCart = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId; 
    const input = request.body;

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"Admin cannot add to cart a product"
        })
    }
    else{

        Cart.findOneAndUpdate( {$and:[{userId: userData._id  }, {productId: productId}]},{$inc:{quantity:input.quantity? input.quantity : 1} } , {new:true})
        .then(data => {
            if(data !== null){
               data.totalAmount = data.price * data.quantity;
               data.save()

               .then(result =>response.send({
                    "status":"success",
                    "message":"Product is already in the cart. It will just add the quantity",
                    result
               }) )
               .catch(error => respond.send({
                    "status":"failed",
                    "message":"Error",
                    error
               }))
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
                                image:result.images[0],
                               
                                productDescription: result.productDescription,
                                price: result.price,
                                quantity: input.quantity? input.quantity : 1,
                                totalAmount:input.quantity? result.price * input.quantity : result.price * 1
                                    
                                
                                
                            }
                        )


                        // This will add and save the new product in the cart to database cart collection
                        return newProductOnCart.save()
                        .then(result => response.send({
                            "status":"success",
                            "message":"Product successfully added to the cart!",
                            result
                        }))
                        .catch(error=>response.send({
                            "status":"failed",
                            "message":"Error",
                            error
                        }))
                    }
                })
                .catch(error => response.send({
                    "status":"failed",
                    "message":"Error",
                    error
                }))
            }
        })

        .catch(error=> response.send({
            "status":"failed",
            "message":"Error",
            error
        }))

        
    }
}
