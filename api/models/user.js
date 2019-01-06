var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username:{
    type:String
  }, 
  password: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;