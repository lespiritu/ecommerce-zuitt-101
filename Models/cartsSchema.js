const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:[true, 'user Id is required!']
        },

        userEmail:{
            type:String,
            required:[true, 'user Email is required!']
        },

        
            productId:{
                type:String,
                required:[true, 'product Id is required!']
            },
            productName:{
                type:String,
                required:[true, 'product name is required!']
            },
            productDescription:{
                type:String,
                required:[true, 'product description is required!']
            },

            quantity: {
                type:Number,
                default:1
            },
            
            price:{
                type:Number,
                required:[true, 'price is required']
            },
            totalAmount:{
                type:Number,
                required:[true, 'total price is required!']
            }

        

    }
)


module.exports = mongoose.model('Cart', cartSchema)