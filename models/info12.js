var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Motorcycles= new mongoose.Schema({
    fleetName:{type:String,default:''},
    email:{type:String,default:''},
    fourstroke:{item1:Number,item2:Number,item3:Number},
    twostroke:{item1:Number,item2:Number,item3:Number},
    electric:{item1:Number,item2:Number,item3:Number},
    
});
Motorcycles.plugin(timestamps);
module.exports = mongoose.model('Motorcycles', Motorcycles);