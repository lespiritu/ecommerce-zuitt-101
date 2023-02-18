const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:[true, 'Email address is required!']
        },

        password:{
            type:String,
            required:[true, 'Password is required!']
        },
        address:{
            type:String,
            required:[true, 'address is Required!']
        },
        fullName:{
            type:String,
            required:[true, 'full name is Required!']
        },
        mobileNo:{
            type:String,
            required:[true, 'mobile number is required!']
        },

        isAdmin:{
            type:Boolean,
            default:false
        }
    }
)


module.exports = mongoose.model("User", userSchema);