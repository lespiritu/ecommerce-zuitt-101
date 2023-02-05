const mongose = require('mongoose');

const productSchema = new mongose.Schema(
    {
        productName:{
            type:String,
            required:[true, 'Product Name is required!']
        },
        productDescription:{
            type:String,
            required:[true, 'Product description is required!']
        },
        category:{
            type:String,
            required:[true, 'Category is required!']
        },
        isActive:{
            type:Boolean,
            default:true
        },
        stocks:{
            type:Number,
            required:[true, 'Stocks is required!']
        },
        price:{
            type:Number,
            required:[true, 'Price is required!']
        }
    }
);


module.exports = mongose.model("Product", productSchema);
