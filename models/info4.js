var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var passengerelectricvehicles = new mongoose.Schema({
    fleetName:{type:String,default:''},
    email:{type:String,default:''},
    Euro2:{item1:Number,item2:Number,item3:Number},
    Euro3 :{item1:Number,item2:Number,item3:Number},
    Euro4:{item1:Number,item2:Number,itm3:Number}
    

});
passengerelectricvehicles .plugin(timestamps);
module.exports = mongoose.model('passengerelectricvehicles ', passengerelectricvehicles);