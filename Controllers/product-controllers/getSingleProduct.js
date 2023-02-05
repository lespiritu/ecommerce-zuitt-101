const Product = require('../../Models/productsSchema.js');


module.exports.getSingleProduct = (request, response)=>{

    Product.findById(request.params.id)
    .then(result => {
        if(result !== null){
            response.send(result)
        }
        else{
            response.send(`Doesn't have data from id or product id is incorect!`)
        }
    })
    .catch(error=> response.send(`Doesn't have data from id or product id is incorect! ${error}`))
}