var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var HeavyDutyDieselVehicles= new mongoose.Schema({
    email:{type:String,default:''},
    fleetName:{type:String,default:''},
    Preeuro:{item1:Number,item2:Number,item3:Number},
    Euro1:{item1:Number,item2:Number,item3:Number},
    Euro2:{item1:Number,item2:Number,item3:Number},
    Euro3 :{item1:Number,item2:Number,item3:Number},
    Euro4:{item1:Number,item2:Number,item3:Number},
    Euro5:{item1:Number,item2:Number,item3:Number},
    Euro6:{item1:Number,item2:Number,item3:Number}
});
HeavyDutyDieselVehicles.plugin(timestamps);
module.exports = mongoose.model('HeavyDutyDieselVehicles', HeavyDutyDieselVehicles);