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










    /** Retrieve User details
     *  - used authentication token to get the details of user
     *  
     *  - to get the orders
     *      - used authentication token to get the orders by _id or user
     *      - find({userId:authUserId}) // this will get array of object for orders
     *      - then assign user.order to the result if its not null.
     */





   /*  add product to cart
            - use PUT method to edit user profile info
            
   */