const PassengerDieselVehicle = require('../models/info3.js');
exports.Insert = function(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14) {
    PassengerDieselVehicle.find({ fleetName: item1, email: item2 }).exec(function(err, results) {
        var length = results.length;
        console.log(length);
        if (length == 0) {
            var newpassen = new PassengerDieselVehicle({
                email: item2,
                fleetName: item1,
                Euro1: { item1: item3, item2: item4, item3: item5 },
                Euro2: { item1: item6, item2: item7, item3: item8 },
                Euro3: { item1: item9, item2: item10, item3: item11 },
                Euro4: { item1: item12, item2: item13, item3: item14 }


            });
            newpassen.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({
                Euro1: { item1: item3, item2: item4, item3: item5 },
                Euro2: { item1: item6, item2: item7, item3: item8 },
                Euro3: { item1: item9, item2: item10, item3: item11 },
                Euro4: { item1: item12, item2: item13, item3: item14 }
            }, function(err, doc) {
                if (err) throw err
            });
        }
    })
}
exports.delete = function(item1, item2) {
    PassengerDieselVehicle.findOneAndDelete({ fleetName: item2, email: item1 }, function(err) {

    });
}
exports.change = function(item1, item2) {

}