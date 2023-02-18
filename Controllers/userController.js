
const User = require("../Models/usersSchema");
const bcrypt = require('bcrypt');
const auth = require('../auth.js');


// ====================== Function for user Registration =================
function userRegistration(request, response){
    const input = request.body;


    // this will return null if theres no email found same with the input email
    User.findOne({email: input.email}) 
    .then(result =>{
        if(result !== null){
            return response.send({
                "status":"failed",
                "message": "The email is already exist in our database!"
            });
        }
        else{
            let newUser =  new User({
                email: input.email,
                password:bcrypt.hashSync(input.password, 10),
                fullName:input.fullName,
                address:input.address,
                mobileNo:input.mobileNo
            });

            newUser.save()
            .then( (data)=>response.send({
                "status": "success",
                "message": "You are now registered to our website!",
                data
            }))
            .catch(error => response.send(error))
        }
    })
    .catch( error => response.send(error))
}

// ====================== end of Function for user Registration =================




// ====================== Function for user Login ==================================
function userLogin(request, response){
    const input = request.body;

    User.findOne({email: input.email})
    .then(result => {
        if(result === null){
            response.send({
                "status":"failed",
                "message":"This email is not yer registered in our website!"
            })
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

            if(isPasswordCorrect){
                // This will generate an object {auth: token-code}
                response.send({
                    "status":"success",
                    "message":"Successfully Log in",
                    auth: auth.createAccessToken(result)
                })
            }
            else{
                response.send({
                    "status":"failed",
                    "message":"Password is in correct!"
                })
            }
            
        }
    })
    .catch(error=> response.send({
        "status":"failed",
        "message":"Error during log in verification! Please try again!",
        error
    }))
}
// ====================== end of Function for user Login ============================


// ====================== function for creating admin account admin only ================

function adminRegistration(request, response){
    const input = request.body;
    const userData = auth.decode(request.headers.authorization);

    if(!userData.isAdmin){
        response.send({
            "status":"failed",
            "message":"You don't have permission to this page!"
        })
    }
    else{
        User.findOne( {email: input.email})
        .then( result => {
            if (result){
            
                response.send({
                    "status":"failed",
                    "message":"Email already exist on the database! Use other email address!",
                    result
                })
            }
            else{
                let newUserAdmin = new User(
                    {
                        email: input.email,
                        password:bcrypt.hashSync(input.password, 10),
                        isAdmin: true,
                        mobileNo: input.mobileNo,
                        address:input.address,
                        fullName: input.fullName
                
                    }
                );

                newUserAdmin.save()
                .then( data => response.send({
                    "status":"success",
                    "message":"Admin account has been created!",
                    data
                }))
                .catch(error => response.send({
                    "status":"failed",
                    "message":"Error during saving!",
                    error
                }))
            }
        })
        .catch(error => response.send({
            "status":"failed",
            "message":"Error during log in verification! Please try again!",
            error
        }))
    }
}


// exported functions
module.exports = {userRegistration, userLogin, adminRegistration}




