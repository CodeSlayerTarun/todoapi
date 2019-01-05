//@imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
//@express app
const app = express();
//@connection mongoDB
mongoose.connect('mongodb://localhost:27017/todoApp', err => {
    if(err){
        console.log(err);
    }else{
        console.log("Connected to DB Succesfully");
    }
});
//@Router Imports
const UsersRoute = require('./routes/users.js');
//@logger morgan
app.use(morgan('dev'));
//@middleware bodyParser
app.use(bodyParser.json());
//@Router middleware app.use()
app.use('/users', UsersRoute);
//@port number
const PORT = process.env.PORT || 3000;
//@Listening to the SERVER
app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
});