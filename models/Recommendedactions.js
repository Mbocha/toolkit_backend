var mongoose = require('mongoose');
var Recommendedactions= new mongoose.Schema({
    email:{type:String,default:''},
    hevMileage:{type:Number,defalut:''},
    hevAdditionalCost:{type:Number,default:''},
    bevAdditionalCost:{type:Number,default:''},
    bevMileage:{type:Number,default:''},
    elecBikeMileage:{type:Number,default:''},
    elecBikeAdditionalCost:{type:Number,default:''},
    bevTrucksMileage:{type:Number,default:''},
    siteElecDemands:{type:Number,default:''},
    pvSystemUnitCost:{type:Number,default:''}

});
module.exports = mongoose.model('Recommendedactions', Recommendedactions);