const GeneralInfo = require('../models/info1.js');
let yyyymmdd = require('yyyy-mm-dd')
var mergeJSON = require("merge-json");
exports.Insert = function(item1, item2, item3, item4, item5, item6, item7, item8) {
    GeneralInfo.find({ Fleetname: item2, email: item1 }).exec(function(err, results) {
        var length = results.length;
        console.log(length);
        if (length == 0) {
            var newgen = new GeneralInfo({
                email: item1,
                Fleetname: item2,
                DieselSulphurLevel: item3,
                LocalCurrency: item4,
                PetrolPrice: item5,
                Dieselprice: item6,
                ElectricityPrice: item7,
                FossilFuelElec:item8
            })
            newgen.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({ DieselSulphurLevel: item3, LocalCurrency: item4, PetrolPrice: item5, Dieselprice: item6, ElectricityPrice: item7, FossilFuelElec: item8 }, function(err, doc) {

            })
        }
    })
}
exports.delete = function(item1, item2) {
    console.log("@#$%^");
    GeneralInfo.findOneAndDelete({ Fleetname: item2, email: item1 }, function(err) {

    });
}
exports.getinfo = function(item1, item2) {
    GeneralInfo.findOne({ Fleetname: item2, email: item1 }, function(err, doc) {
        if (err) throw err;
        else
            return doc;
    });
}
exports.selectfleetname = function(email, res) {
    console.log(email + "*");
    GeneralInfo.find({ email: email }).exec(function(err, results) {
        var length = results.length;
        var fleetname = [];
        var createdate = [];
        var updated = [];
        for (var i = 0; i < results.length; i++) {
            fleetname[i] = results[i].Fleetname;
            console.log();
            createdate[i] = yyyymmdd(results[i].createdAt);

            updated[i] = yyyymmdd(results[i].updatedAt);

        }
        var secjson = { fleetname: fleetname, createdatedata: createdate, updatedata: updated }
        //var newjson = mergeJSON.merge(json, secjson);

        res.send(secjson);

    });
}