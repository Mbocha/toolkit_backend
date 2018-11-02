const PassengerElectricTruck = require('../models/info7.js');
exports.Insert = function(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11) {
    PassengerElectricTruck.find({ fleetName: item1, email: item2 }).exec(function(err, results) {
        var length = results.length;
        console.log(length);
        if (length == 0) {
            var newpass = new PassengerElectricTruck({
                email: item2,
                fleetName: item1,
                Euro2: { item1: item3, item2: item4, item3: item5 },
                Euro3: { item1: item6, item2: item7, item3: item8 },
                Euro4: { item1: item9, item2: item10, item3: item11 },


            });
            newpass.save(function(err) {
                if (err) throw err;
            })
        } else {
            console.log("okk");
            results[0].update({
                Euro2: { item1: item3, item2: item4, item3: item5 },
                Euro3: { item1: item6, item2: item7, item3: item8 },
                Euro4: { item1: item9, item2: item10, item3: item11 }

            }, function(err, doc) {
                if (err) throw err;
            });
        }
    })

}
exports.delete = function(item1, item2) {
    PassengerElectricTruck.findOneAndDelete({ fleetName: item2, email: item1 }, function(err, results) {

    });
}
exports.change = function(item1, item2) {

}