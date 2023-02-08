const Order = require('../../Models/ordersSchema.js');
const Product = require('../../Models/productsSchema.js');

const auth = require('../../auth.js');

module.exports.addRating = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const orderId = request.params.orderId;
    const input = request.body;


    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!");
    }
    else{
        Order.findById(orderId)
        .then( Orderdata => {
            if(Orderdata === null){
                response.send("Invalid Order ID")
            }
            else{
                if(Orderdata.userId !== userData._id){
                    response.send("You don't have permission for this page!")
                }
                else{

                    if(Orderdata.orderStatus !== "recieved"){
                        response.send("You don't have permission for this page. This product is not yet recieved!")
                    }
                    else{
                        
                        if(Orderdata.isRated){
                            return response.send("You already rated this product for this order!")
                        }
                        else{
                            if( input.rating > 5){
                                return  response.send("Please input 1 to 5 rating only. Thank you!")
                              }
                              else if(input.rating < 1){
                                  return  response.send("Please input 1 to 5 rating only. Thank you!")
                              }
                              else{
                                  Product.findById(Orderdata.productId)
                                  .then(result => {
                                      result.ratings.push( {rating: input.rating, userAccount: Orderdata.userEmail, feedBack: input.feedBack});
                                      
                                      result.save()
                                      .then(newProductData=> {
                                            Orderdata.isRated = true;
                                            Orderdata.save()
                                            .then( ()=> response.send(`Thank you for your feeback! \n ${newProductData}`))
                                            .catch(error => response.send(error))
                                      })
                                      .catch(error => response.send(error))
                                  })
                                  .catch(error => response.send(error))
                              }
                        } 
                    }

                    
                }
            }
        })
        .catch(error => response.send(error))
    }
}