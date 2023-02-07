// =============== All Requrest ====================

    /**  user registration 
     *      - use email and password to register/sign-up
     *  
     * 
     * Done here
     */ 

    

    /**  user authentication for log-in
     *      - it will generate the token to postman
     *  
     * 
     * Done here
     */ 

    /** create poduct (Admin only)
            product = {
                productName: 'Jordan1',
                productDescription:' description of product',
                category:'Shoes',
                isActive:true, default
                price: 3000
            }

            Done here
     */ 



            

        /* Retrieve all active products

            Product.find({})
                .then(result => {
                if(result.isAdmin){
                 response.send(result)
                }
            })
            Done here
    */


    /*  get single product
            - findById - used the id of the product
            - sample route in postman localhost/4000/product/42338

            - sample code in route.js router.get('/getProduct/:id', productController.getProduct)
            - sample code - Product.findById(request.params.id)

            Done here
    */



            /* update product information - admin only
                - authenticate by token
                - sample route in postman localhost/4000/product/42338
                - findByIdAndUpdate(request.params.id)
                - sample code in route.js router.get('/getProduct/:id', productController.getProduct)
                
                Done here

            */










    /** Retrieve User details with orders of users
     *  - used authentication token to get the details of user
     *  


            Done here
     */






   /*  add product to cart
            - use PUT method to edit user profile info
            Done here
   */





    /*
      Done  - create order from cart
      Done  - update product quantity and amount
      Done  - delete cart after order
      Done  - create order from productId

      Done  - show orders - user
      Done  - show single order - user

      Done  - update order status to recieved - user
      Done  - show order history - user

            
           

      Done  - show all orders admin only
      Done  - show all active orders admin only
      Done  - show all recieved orders admin only

            - show total sales admin only
            - add feedback and stars

            
            


    */