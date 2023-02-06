const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');


// View cart for specific user after log-in
module.exports.viewUserCart = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        response.send("This page is restricted for user only. Admin doesn't have an access!")
    }
    else{
        Cart.find({userId:userData._id})
        .then(result => response.send(result))
        .catch(error=> response.send(error))
    }
}