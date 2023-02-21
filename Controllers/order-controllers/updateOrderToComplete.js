
const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');

module.exports.updateOrderToComplete = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const orderId = request.params.orderId;

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"Admin cannot access this page!"
        });
    }
    else{
        Order.findById(orderId)
        .then(data => {
            if (data === null){
                response.send({
                    "status":"failed",
                    "message":"Invalid Order ID"
                })
            }
            else{

                if(data.orderStatus === "recieved"){
                    return response.send({
                        "status":"failed",
                        "message":"This product is already recieved"
                    })
                }
                else{
                    if(data.userId === userData._id){

                        data.orderStatus = "recieved";
                        data.save()
                        .then( ()=> response.send({
                            "status":"success",
                            "message":"Order completed!",
                            data
                        }) )
                        .catch(error => response.send(error))
                    }
                    else{
                        response.send({
                            "status":"failed",
                            "message":"You don't have permission to this page!"
                        })
                    }
                }
                
                
            }
        })
        .catch(error =>response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}

