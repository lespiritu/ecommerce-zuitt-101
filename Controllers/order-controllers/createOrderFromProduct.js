const auth = require('../../auth.js');
const Product = require('../../Models/productsSchema.js');
const Order = require('../../Models/ordersSchema.js');

module.exports.createOrderFromProduct =(request, response) =>{
    const userData = auth.decode(request.headers.authorization);
    const productId = request.params.productId;
    const input = request.body;
    
    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{

        Product.findById(productId)
        .then(data => {
            if(data === null){
                response.send("Invalid product ID")
            }
            else{

                if(!data.isActive){
                    response.send("This product is not yet active or no available stocks right now!")
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
                        .then(saveData => {
    
                            data.stocks -= input.quantity;
                            data.save()
                            .then(()=>{
                                response.send(`${saveData.productName} is now on going process. Thank you for your order!`)
                            } )
                            .catch(error => response.send(error))
    
                        })
                        .catch(error => response.send(error))
                    }
                    else if(!input.quantity){
                        response.send(`Please input the value of the quantity. Thank you!`)
                    }
                    else{
                        response.send(`We don't have enough stock for your order. Our stocks is:${data.stocks} and your order is:${input.quantity}`)
                    }
                }
                
                
            }
        })
        .catch(error=> response.send(error));
            
    }
}