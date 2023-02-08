const auth = require('../../auth.js');
const Order = require('../../Models/ordersSchema.js');

// show  all on going orders from user
module.exports.showOnGoingOrders = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!");
    }
    else{
        Order.find({ $and :[ {userId:userData._id}, {orderStatus: "on going"}] })
        .then(data => response.send(data))
        .catch(error => response.send(error))
    }
}


// show single order from user
module.exports.showSingleOrder = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const orderId = request.params.orderId;

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!");
    }
    else{
        
        Order.findById(orderId)
        .then( data => {
            if(data === null) {
                response.send("Invalid Order ID!")
            }
            else{
                if(data.userId === userData._id){
                    response.send(data)
                }
                else{
                    response.send("You don't have permission to this page!")
                }
                
            } 
        })
        .catch(error => response.send(error))
    }
}


