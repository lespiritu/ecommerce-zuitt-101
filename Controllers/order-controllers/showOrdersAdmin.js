const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');


// Show all orders (admin only)
module.exports.showOrdersAdmin = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send(`You are not authorize to this page!`)
    }
    else{

        Order.find({})
        .then(data => response.send(data))
        .catch(error => response.send(error))
    }
}

// show all completed orders (admin only)
module.exports.showOrdersCompleted = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send(`You are not authorize to this page!`)
    }
    else{

        Order.find({orderStatus:"recieved"})
        .then(data => response.send(data))
        .catch(error => response.send(error))
    }
}

// show all on going orders (admin only)

module.exports.showOnGoingOrdersAdmin = (request, response)=>{
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send(`You are not authorize to this page!`)
    }
    else{

        Order.find({orderStatus: "on going"})
        .then(data => response.send(data))
        .catch(error => response.send(error))
    }
}
