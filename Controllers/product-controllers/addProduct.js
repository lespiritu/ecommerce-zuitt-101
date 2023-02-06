const User = require('../../Models/usersSchema');
const auth = require('../../auth.js');
const Product = require('../../Models/productsSchema.js')

module.exports.addProduct = (request, response)=>{
    const input = request.body;
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send(`You are not authorize to add product!`)
    }
    else{
        Product.findOne({productName:input.productName})
        .then(result =>{
            if(result !== null){
                response.send(`${result.productName} is already in the database!`)
            }
            else{
                let newProduct = new Product(
                    {
                        productName:input.productName,
                        productDescription:input.productDescription,
                        category:input.category,
                        price:input.price,
                        stocks:input.stocks
                    }
                )
    
                // This will add and save the new product to database product collection
                return newProduct.save()
                .then(result => response.send(`${result.productName} is now on the products collection`))
            }
        })
        .catch(error => response.send(error))
    }

    // Product.findOne({productName:input.productName})
    // .then(result => {
    //     if(result === null){
    //         User.findById(userData._id)
    //         .then(result => {
    //               if(result.isAdmin){
    //                     let newProduct = new Product(
    //                         {
    //                             productName:input.productName,
    //                             productDescription:input.productDescription,
    //                             category:input.category,
    //                             price:input.price,
    //                             stocks:input.stocks
    //                         }
    //                     )
            
    //                     // This will add and save the new product to database product collection
    //                     return newProduct.save()
    //                     .then(result => response.send(`${result.productName} is now on the products collection`))
    //                 }
    //                 else{
    //                     response.send(`You are not authorize to add product!`)
    //                 }
    //         })
    //         .catch(error=>response.send(error))
    //     }
    //     else{
    //         response.send(`${result.productName} is already in the database!`)
    //     }
    // })
    // .catch(error=>response.send(error))
    

}




