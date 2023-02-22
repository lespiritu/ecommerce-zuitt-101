const Cart = require('../../Models/cartsSchema.js');
const auth = require('../../auth.js');


// View cart for specific user after log-in
module.exports.viewUserCart = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);

    if(userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"Admin connot view Cart!"
        })
    }
    else{
        Cart.find({userId:userData._id})
        .then(result => response.send({
            "status":"success",
            "message":"View all cart",
            result
        }))
        .catch(error=> response.send({
            "status":"failed",
            "message":"Error",
            error
        }))
    }
}