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

      Done  - show total sales admin only
      Done  - Add create admin account admin only

      Done  - add feedback and stars

            
            


    */




            // features

            /**
               - Add Product (admin only)
               - Get all Active Products (users and none users)
               - Get single active product (user)      -    input productId on params
               - Update product details (admin only)   -    input productId on params
               - Get all product (admin only)
               - Get all in-active product (admin only)   -   input productId on params
               - Get single product in-active or active product (admin only)   -   input productId on params


               - User registration   -   check if email exist
               - User log-in -  Check if email and password is correct , will output the access token
               - Create admin account (admin only)


               - Add to cart / (user only)  
                    - input productId on params
                    - if you already have the same product on cart, it will just add the quantity you put.
               - View user Cart (user only)  -  Can't view by other user
               - Update cart quantity (user only)   -   input cartId on params
               - Delete single product on cart   -   input cartId on params


               - Create order from cart (user only) - input cartId on params
                    - Cannot process order if product stocks is < to quantity
                    - Cannot process order if product is in-active status
                    - This cart will be deleted after you process order
                    - The stocks of the product will be subtracted from your order quantity
               - Create order from product ID (user only)   - input product ID on params
                    - Cannot process order if product stocks is < to quantity
                    - Cannot process order if product is in-active status
                    - The stocks of the product will be subtracted from your order quantity
               - View on going order (user only)
                    - see all order from this user
               - Show single order (user only)   -   input order ID on params
               - Update order status to recieved (user only)  -   input order ID on params
                    - other user cannot update it
               - View complete orders (user only)
                    - user will view his/her order history or completed order
               - Add rating on completed or recieved order/product (user only)   -  input order ID on params
                    - This will not generate if the Order is not yet recieved
                    - It will allow 1-5 to input in rating
                    - After you generate the rating, you cannot rate this product for this order again.
                    - Your rating will be save on the product that you rated.

                - View Sales (admin only) - This will show numbers of completed order and total amount of sales

                - View all orders (admin only)
                - View on going orders (admin only)
                - View completed orders (admin only)
                - View single order (admin only)   -   input order ID

             */
            