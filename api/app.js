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
const TodoRoute = require('./routes/todo');
//@logger morgan
app.use(morgan('dev'));
//@middleware bodyParser
app.use(bodyParser.json());
//@CORS enbaled
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
//@Router middleware app.use()
app.use('/users', UsersRoute);
app.use('/todo', TodoRoute);
//@port number
const PORT = process.env.PORT || 3000;
//@Listening to the SERVER
app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
});