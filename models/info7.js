var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var PassengerElectricTruck= new mongoose.Schema({
    email:{type:String,default:''},
    fleetName:{type:String,default:''},
    Euro2:{item1:Number,item2:Number,item3:Number},
    Euro3 :{item1:Number,item2:Number,item3:Number},
    Euro4:{item1:Number,item2:Number,item3:Number}
    
});
PassengerElectricTruck.plugin(timestamps);
module.exports = mongoose.model('PassengerElectricTruck', PassengerElectricTruck);