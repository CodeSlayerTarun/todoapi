var mongoose = require('mongoose');


var TaskSchema = new mongoose.Schema({

    name:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
    },
    sendername:{
          type:String,
    },
    todolist:[{
      list:{
          type:String,
          status:String,

      },
      
      timestamp:{
        type : Date,
         default: Date.now 
      }   
    }],
    addtodo:[{
        type:String,
        status:String,
    },
    timestamp:{
        type : Date,
         default: Date.now
  }],  
    
});
var Task = mongoose.model('task', TaskSchema);
module.exports = User;
