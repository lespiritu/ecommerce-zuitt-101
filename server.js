const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// asign port number
const port = 4001; 

// asign express() to varaible app
const app = express(); 


// =================== imported routes ====================
const userRoutes = require('./Routes/userRoutes.js')
// =================== end of imported routes ====================




// [Mongoose] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back [solved]
mongoose.set('strictQuery', true);

//connecting to the database [MongoDB]
mongoose.connect('mongodb+srv://admin:admin@batch245-espiritu.dgm8gby.mongodb.net/E-commerse-101?retryWrites=true&w=majority', 
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
);

let db = mongoose.connection;
// connecting error
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", ()=>console.log(`We're connected to the database cloud!`));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());



// request routes
app.use("/user", userRoutes)

// listen app
app.listen(port, ()=> console.log(`Server is running at server: ${port}`))