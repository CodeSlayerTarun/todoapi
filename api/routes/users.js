const express = require('express');
const router = express.Router();

//@routes GET "/users/signup"
router.get('/signup', (req, res, next) => {
    res.send("Signup");
});
//@routes POST "/users/signup"
router.post('/signup', (req, res, next) => {
    res.status(200).json({
        message: "Signup done"
    });
});
//@routes GET "/users/login"
router.get('/login', (req, res, next) => {
    res.status(200).json({
        message: "Login get."
    });
});
//@routes POST "/users/login"
router.post('/login', (req, res, next) => {
    res.status(200).json({
        message: "Login done."
    })
});


module.exports = router;