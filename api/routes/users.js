const express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
//@Object ID for _id validation
var ObjectId = mongoose.Types.ObjectId;
//@model import Users
var Users = require('../models/user');
//@route POST "/users/signup"
router.post('/signup', (req, res) => {
    var newUser = new Users({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    //bcrypt-nodejs hashing
    bcrypt.hash(newUser.password, null, null, (err, hash) => {
        if (err) {
            console.log(`Error in storing password ${err}`);
        } else {
        newUser.password = hash;
        }
    });
    newUser.save((err, doc) => {
        if(err){
            res.send({message: err});
        }else{
            res.send(doc);
        }
    });
});
//@route POST "users/signin"
router.post('/signin', (req, res) => {
    var username = req.body.username;
    Users.findOne({'username': username}, (err, doc) => {
        if (err) {
            res.status(400).json({
                message: `Error : ${err}`
            }); 
        } else if(!doc) {
            res.status(400).json({
                message: `This is user is not registered to us, ${doc}`
            });
        }
        else {
        var enteredPwd = req.body.password;
        bcrypt.compare(enteredPwd, doc.password, (err, result) => {
            if(err) {
                res.status(400).json({
                    message: "You entered an invalid password.",
                })
            } else {
                res.status(200).json({
                    message: "You loggedin successfully.",
                    result: result
                })
            }
        });
        }
    });
});

module.exports = router;