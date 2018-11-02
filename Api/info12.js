const Motorcycles = require('../models/info12.js');
exports.Insert = function(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11) {
    Motorcycles.find({ fleetName: item1, email: item2 }).exec(function(err, results) {
        var length = results.length;
        console.log(length);
        if (length == 0) {
            console.log("why");
            var newpass = new Motorcycles({
                email: item2,
                fleetName: item1,
                fourstroke: { item1: item3, item2: item4, item3: item5 },
                twostroke : { item1: item6, item2: item7, item3: item8 },
                electric: { item1: item9, item2: item10, item3: item11 },


            });
            newpass.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({
                fourstroke: { item1: item3, item2: item4, item3: item5 },
                twostroke: { item1: item6, item2: item7, item3: item8 },
                electric: { item1: item9, item2: item10, item3: item11 },

            }, function(err, doc) {
                if (err) throw err;
            });
        }
    })

}
exports.delete = function(item1, item2) {
    Motorcycles.findOneAndDelete({ fleetName: item2, email: item1 }, function(err, results) {

    });
}
exports.change = function(item1, item2) {

}