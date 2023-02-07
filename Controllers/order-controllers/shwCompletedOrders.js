const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');

module.exports.showCompleteOrder = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!");
    }
    else{
        Order.find( { $and :[{userId:userData._id}, {orderStatus:"recieved"}]})
        .then(data => {
            if (data === null){
                response.send("This page is restricted for user only. Admin doesn't have an access!");
            }
            else{
                response.send(data)
            }
        })
        .catch(error=> response.send(error))
    }
}