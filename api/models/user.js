var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
name: {
        type: String,
        required: true,
        },
   username:{
       type:String,
       required:true,
       }, 
   phone:{
       type:Number,
   }, 
   address:{
    type:String,
   },

  email: {
    type: String,
    required: true,
    },
  
  password: {
    type: String,
    required: true,
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;