
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Generators= new mongoose.Schema({
  fleetName:{type:String,default:''},
    email:{type:String,default:''},
   Euro1:{item1:Number,item2:Number}
  });
  Generators.plugin(timestamps);
module.exports = mongoose.model('Generators', Generators);