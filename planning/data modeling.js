

// going to users collection
user = {
      email:String,
      password:String,
      isAdmin:Boolean, // default false

      // This will display ongoing orders
      orders: [
            {     _id: String, // This will be the order number
                  products:[ {productName:String, quantity:Number, price:Number}],
                  totalAmount:Number,
                  purchasedOn: Data - new Date(),
                  status:String // recieved or onGoing default to onGoing
            },
            {
                  _id: String, // This will be the order number
                  products:[ {productName:String, quantity:Number, price:Number}],
                  totalAmount:Number,
                  purchasedOn: Data - new Date(),
                  status:String // recieved or onGoing default to onGoing 
            }
      ],

      cart:[
            { productName:String, quantity:Number,price:Number },
            { productName:String, quantity:Number,price:Number }
      ]


}


// Going to products collection
product = {
      productName: 'Jordan1',
      productDescription:' description of product',
      category:'Shoes',
      isActive:true,
      price: 3000
}





// going to orders collection

order = {
      userId:String, // This will send the user ID after order

      _id: String, // This will be the order number
      products:[ 
            {productName:String, quantity:Number, price:Number},
            {productName:String, quantity:Number, price:Number},
            {productName:String, quantity:Number, price:Number}
      ],

      totalAmount:Number,
      purchasedOn: Data - new Date(),
      status:String // recieved or onGoing default to onGoing 
      
}
