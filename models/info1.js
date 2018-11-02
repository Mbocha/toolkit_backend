var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var GeneralInfo= new mongoose.Schema({
    email:{type:String,defalut:''},
    Fleetname:{type:String,default:''},
    DieselSulphurLevel:{type:Number,defalut:''},
    LocalCurrency:{type:String,default:''},
    PetrolPrice :{type:Number,default:''},
    Dieselprice:{type:Number,default:''},
    ElectricityPrice:{type:Number,default:''},
    FossilFuelElec:{type:Number,default:''}
});
GeneralInfo.plugin(timestamps);
module.exports = mongoose.model('GeneralInfo', GeneralInfo);