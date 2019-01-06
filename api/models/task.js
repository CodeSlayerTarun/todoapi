var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    user_id:{
        type: String
    },
    todoName: {
        type: String
    },
    todoTask: {
        type: String
    },
    timeOfCompletion: {
        type: String
    },
    timeStamp: {
        type : Date,
        default: Date.now
    },
    todoStatus: {
        type: String,
        default: "Not completed"
    }  
}); 
var Task = mongoose.model('task', TaskSchema);
module.exports = Task;
