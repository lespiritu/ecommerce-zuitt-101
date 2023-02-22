const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');


// Show all orders (admin only)
module.exports.showOrdersAdmin = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You are not authorize to this page!"
        })
    }
    else{

        Order.find({})
        .then(data => response.send({
            "status":"success",
            "message":"All Orders view",
            data
        }))
        .catch(error => response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}

// show all completed orders (admin only)
module.exports.showOrdersCompleted = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You are not authorize to this page!"
        })
    }
    else{

        Order.find({orderStatus:"recieved"})
        .then(data => response.send({
            "status":"success",
            "message":"All Complete Orders View!",
            data
        }))
        .catch(error => response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}

// show all on going orders (admin only)

module.exports.showOnGoingOrdersAdmin = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You are not authorize to this page!"
        })
    }
    else{

        Order.find({orderStatus: "on going"})
        .then(data => response.send({
            "status":"success",
            "message":"All On Going Orders View!",
            data
        }))
        .catch(error => response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}




// show single order admin only
module.exports.showSingleOrderAdmin = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);
    const orderId = request.params.orderId;

    if(!userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You are not authorize to this page!"
        });
    }
    else{
        Order.findById(orderId)
        .then( data => {
            if (data === null){
                response.send({
                    "status":"failed",
                    "message":"Invalid Order ID!"
                })
            }
            else{
                response.send({
                    "status":"success",
                    "message":"View Single Order",
                    data
                })
            }
        })
        .catch(error => response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}   