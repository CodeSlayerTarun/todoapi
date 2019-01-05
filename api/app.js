//@imports
const express = require('express');
//@express app
const app = express();
//@port number
const PORT = process.env.PORT || 3000;
//@Listening to the SERVER
app.listen(PORT, () => {
    console.log('App listening on port '+PORT);
});