var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var PassengerDieselVehicle= new mongoose.Schema({
    fleetName:{type:String,default:''},
    email:{type:String,default:''},
    Euro1:{item1:Number,item2:Number,item3:Number},
    Euro2:{item1:Number,item2:Number,item3:Number},
    Euro3 :{item1:Number,item2:Number,item3:Number},
    Euro4:{item1:Number,item2:Number,item3:Number},
    
});
PassengerDieselVehicle.plugin(timestamps);
module.exports = mongoose.model('PassengerDieselVehicle', PassengerDieselVehicle);