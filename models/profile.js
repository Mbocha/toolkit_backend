var mongoose = require('mongoose');
var profile= new mongoose.Schema({
    email:{type:String,default:''},
    fullname:{type:String,defalut:''},
    organ:{type:String,default:''},
    expert :{type:String,default:''},
    phoneNum:{type:String,default:''},
    imgurl:{type:String,default:''}
});
module.exports = mongoose.model('Profile', profile);