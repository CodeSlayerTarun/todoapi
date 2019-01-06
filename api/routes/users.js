const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
//@Object ID for _id validation
var ObjectId = mongoose.Types.ObjectId;
//@model import Users
var Users = require('../models/user');
//@route POST "/users/signup"
router.post('/signup', (req, res) => {
    var newUser = new Users({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone
    });
    //bcrypt-nodejs hashing
    bcrypt.hash(newUser.password, null, null, (err, hash) => {
        if (err) {
            res.json({
                message: "There was an error in saving the password.",
                result: err
            })
        } else {
        newUser.password = hash;
        }
    });
    newUser.save((err, doc) => {
        if(err){
            res.json({
                message: "There was an error in saving this user.",
                result: err
            });
        }else{
            res.json({
                message: "The user was saved successfully.",
                result: doc
            });
        }
    });
});
//@route POST "users/signin"
router.post('/signin', (req, res) => {
    var username = req.body.username;
    Users.findOne({'username': username}, (err, doc) => {
        if (err) {
            res.json({
                message: "No such user found.",
                result: err
            }); 
        } else if(!doc) {
            res.json({
                message: "This user is not registered to us",
                result: doc
            });
        }
        else {
        var enteredPwd = req.body.password;
        bcrypt.compare(enteredPwd, doc.password, (err, result) => {
            if(err) {
                res.json({
                    message: "You entered an invalid password.",
                    result: err
                })
            } else {
                const token = jwt.sign(
                    {
                        username: req.body.username, user_Id: req.body._id
                    },
                    "secretKey",
                    { expiresIn: "1h" }
                )
                res.json({
                    message: "You loggedin successfully.",
                    result: result,
                    token: token,
                    expiresIn: 3600
                })
            }
        });
        }
    });
});

module.exports = router;