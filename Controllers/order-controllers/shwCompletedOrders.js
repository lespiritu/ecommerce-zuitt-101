const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');

module.exports.showCompleteOrder = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"Admin don't have permision in this page!"
        });
    }
    else{
        Order.find( { $and :[{userId:userData._id}, {orderStatus:"recieved"}]})
        .then(data => {
            if (data === null){
                response.send({
                    "status":"failed",
                    "message":"Error! Could be use ID not found!"
                });
            }
            else{
                response.send({
                    "status":"success",
                    "message":"All completed orders",
                    data
                })
            }
        })
        .catch(error=> response.send({
                "status":"failed",
                "message":"Error! During finding data!",
                error
        }))
    }
}