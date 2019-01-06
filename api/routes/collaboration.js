const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//@model import TaskSchema and UserSchema
const Tasks = require('../models/task');
const Users = require('../models/user');
//@middleware JWT check authentication
const checkAuth = require("../middleware/check-auth");
//@route POST "todo/share"
router.put('/share/:todoId', (req, res, next) => {
    var todoId = req.params.todoId;
    var newAssignUser = req.body.assignedTo;
    var updatedTodo = {
        assignedTo: req.body.assignedTo
    }
    Tasks.findById(todoId, (err, doc) => {
        if(err){
            console.log("first");
            res.json({
                message: "cannot find the todo",
            })
        } else {
                if(doc.assignedTo.includes(newAssignUser)){
                    res.json({
                        message: "you have already assigned this user.",
                    })
                } else {
                    Tasks.findByIdAndUpdate(todoId, { $push: updatedTodo }, { new: true}, (err, doc) => {
                        if(err){
                            res.json({
                            message: "There was an error in sharing the todo",
                            result: err
                            });
                        } else {
                            res.json({
                                message: "Todo shared succesfully.",
                                result: doc
                            })
                        }
                    })
                }
        }
    })
});
module.exports = router;