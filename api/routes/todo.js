const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//@model import TaskSchema
const Tasks = require('../models/task');
//@middleware JWT check authentication
const checkAuth = require("../middleware/check-auth");
//@route GET "todo/list"
router.get("/list/:user_id", checkAuth, (req, res, next) => {
    Tasks.find({$or : [{"user_id": req.params.user_id}, {"assignedTo": [req.params.user_id] } ] }, (err, docs) => {
        if(err){
            res.json({
                message: "There was an error in fetching the list.",
                result: err
            })
        } else{
            if(docs.length == 0){
                res.json({
                    message: "List is empty.",
                    result: docs
                })
            } else {
            res.json({
                message: "List fetched succesfully.",
                result: docs
            })
            }
        }
    })
});
//@route POST "todo/add"
router.post("/add", checkAuth,(req, res, next) => {
    var newTodo = new Tasks({
        user_id: req.body.user_id,
        todoName: req.body.todoName,
        todoTask: req.body.todoTask,
        timeOfCompletion: req.body.timeOfCompletion,
        timeStamp: req.body.timeStamp,
        assignedTo: req.body.assignedTo
    });
    newTodo.save((err, doc) => {
        if(err){
            res.json({
                message: "Error in saving the Todo, please try again.",
                result: err
            })
        } else {
            res.json({
                message: "Your Todo saved successfully.",
                result: doc
            })
        }
    });
});
//@route PUT to update the particular todo 
router.put('/update/:todoId', checkAuth,(req, res, next) => {
    var todo = {
        todoTask: req.body.todoTask,
        timeOfCompletion: req.body.timeOfCompletion,
        timeStamp: req.body.timeStamp,
        todoStatus: req.body.todoStatus,
        assignedTo: req.body.assignedTo
    };
    Tasks.findByIdAndUpdate(req.params.todoId, { $set: todo}, {new: true}, (err, doc) => {
        if(err){
            res.json({
            message: "Failed to update the todo.",
            result: err
            })
        }else {
        res.json({
            message: "Your Todo is updated.",
            result: doc
        })
        }
    });
});
//@route DELETE a particular todo
router.delete('/delete/:todoId', checkAuth,(req, res, next) => {
    Tasks.findByIdAndRemove(req.params.todoId, (err, doc) => {
        if(err){
            res.json({
                message: "There was problem in removing the todo.",
                result: err
            })
        } else {
            res.json({
                message: "Your todo is deleted.",
                result: doc
            })
        }
    })
});
//@exports
module.exports = router;