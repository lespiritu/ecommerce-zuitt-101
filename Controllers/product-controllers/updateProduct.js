const User = require('../../Models/usersSchema.js');
const Product = require('../../Models/productsSchema.js');
const auth = require('../../auth.js');



module.exports.updateProduct = (request, response)=>{
    const input = request.body;
    const userData = auth.decode(request.headers.authorization);

    User.findById(userData._id)
    .then(result => {
        if(result.isAdmin){
            
            Product.findByIdAndUpdate(request.params.productId, 
                {
                    productName:input.productName, 
                    productDescription:input.productDescription,
                    category:input.category,
                    isActive:input.isActive,
                    stocks:input.stocks,
                    price:input.price
                    
                   
                },  
                {new:true})
                
            .then(result => response.send(result))
            .catch(error=> response.send(error))
        }
        else{
            response.send(`You are not allowed to update product information!`)
        }
    })
    .catch(error=> {
        response.send(error);
        response.send(`Or Incorrect product ID`)
    })
}

