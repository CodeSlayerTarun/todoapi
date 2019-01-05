//@imports
const express = require('express');
const bodyParser = require('body-parser');
//@express app
const app = express();
//@Router Imports
const UsersRoute = require('./routes/users.js');
//@middleware bodyParser
app.use(bodyParser.json());
//@Router middleware aap.use()
app.use('/users', UsersRoute);
//@port number
const PORT = process.env.PORT || 3000;
//@Listening to the SERVER
app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
});