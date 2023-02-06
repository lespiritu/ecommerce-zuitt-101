const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js')


// Getting all products included not active and active
module.exports.getAllProducts = (request, response)=>{
    
    const userData = auth.decode(request.headers.authorization)
    
    if(!userData.isAdmin){
        response.send("You are not authorized in this page!")
    }
    else{
        Product.find({})
        .then(result => {
            response.send(result)
        })
        .catch(error => response.send(error))
    }
}


// getting all in-active products

module.exports.getInActiveProducts = (request, response)=>{

    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send("You are note authorized in this page!")
    }
    else{
        Product.find({isActive: false})
        .then(result => response.send(result))
        .catch(error => response.send(error))
    }
}