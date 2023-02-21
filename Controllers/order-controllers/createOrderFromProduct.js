const auth = require('../../auth.js');
const Product = require('../../Models/productsSchema.js');
const Order = require('../../Models/ordersSchema.js');

module.exports.createOrderFromProduct =(request, response) =>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;
    const input = request.body;
    
    if(userData.isAdmin){
        response.send({
            "status": "failed",
            "message": "Admin account cannot make an order!"
        })
    }
    else{

        Product.findById(productId)
        .then(data => {
            if(data === null){
                response.send({
                    "status":"failed",
                    "message":"Invalid product ID"
                })
            }
            else{

                if(!data.isActive){
                    response.send({
                        "status":"failed",
                        "message": "This product is not yet active!"
                    })
                }
                else{
                    if(input.quantity && data.stocks >= input.quantity){
                        let newProduct = new Order(
                            {
                                userId: userData._id,
                                userEmail: userData.email,
                
                                productId: data._id,
                                productName: data.productName,
                                productDescription: data.productDescription,
                                price: data.price,
                                quantity: input.quantity? input.quantity : 1,
                                totalAmount: input.quantity? input.quantity * data.price : data.price * 1
                            }
                        )
                            
                        
                        
                        newProduct.save()
                        .then(result => {
    
                            data.stocks -= input.quantity;
                            data.save()
                            .then(()=>{
                                response.send({
                                    "status":"success",
                                    "message":"Order successfully created. Thank you for your order!",
                                    result
                                })
                            } )
                            .catch(error => response.send({
                                "status":"failed",
                                "message":"Order could not be save!",
                                error
                            }))
    
                        })
                        .catch(error => response.send({
                            "status":"failed",
                            "message":"Order could not be save!",
                            error
                        }))
                    }
                    else if(!input.quantity){
                        response.send({
                            "status":"failed",
                            "message":"Please input the value of the quantity. Thank you!"
                        })
                    }
                    else{
                        response.send({
                            "status":"failed",
                            "message":"We don't have enough stocks for your order!"
                        })
                    }
                }
                
                
            }
        })
        .catch(error=> response.send({
            "status":"failed",
            "message":"Invalid Product Id!",
            error
        }));
            
    }
}