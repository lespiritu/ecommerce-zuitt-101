const Order = require('../../Models/ordersSchema.js');
const auth = require('../../auth.js');

module.exports.ShowTotalSale = (request, response) =>{

    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send("You are not authorize to this page!")
    }
    else{
        Order.find({orderStatus:"recieved"})
        .then(data => {
            if(data === null){
                response.send("Don't have sales right now!")
            }
            else{
               let arrayOfTotalAmount =  data.map( item => item.totalAmount);
               let totalSale = arrayOfTotalAmount.reduce( (a, b)=> a + b);
                let totalOrdersRecieved = data.length;

                const sales ={
                    totalSale: totalSale,
                    totalOrdersRecieved: totalOrdersRecieved
                };

                response.send(sales)

                
            }
        })
        .catch(error => response.send(error))
    }
}