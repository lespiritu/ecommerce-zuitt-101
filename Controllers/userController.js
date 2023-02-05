
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
            return response.send('The email is already exist!');
        }
        else{
            let newUser =  new User({
                email: input.email,
                password:bcrypt.hashSync(input.password, 10),
            });

            newUser.save()
            .then( ()=>response.send('You are now registered to our website!'))
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
            response.send(`The email ${input.email} is not yet registered in our website!`)
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

            if(isPasswordCorrect){
                // This will generate an object {auth: token-code}
                response.send({auth: auth.createAccessToken(result)})
            }
            else{
                response.send(`Password is incorrect!`)
            }
            
        }
    })
    .catch(error=> response.send(error))
}
// ====================== end of Function for user Login ============================




// exported functions
module.exports = {userRegistration, userLogin}




