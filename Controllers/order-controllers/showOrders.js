const auth = require('../../auth.js');
const Order = require('../../Models/ordersSchema.js');

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



module.exports.showSingleOrder = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const orderId = request.params.orderId;

   
        Order.findById(orderId)
        .then( data => data === null? response.send("Invalid Order ID!") : response.send(data))
        .catch(error => response.send(error))
       
}