const Generators = require('../models/info13.js');
exports.Insert = function(item1, item2, item3, item4) {
    console.log("tt");
    Generators.find({ fleetName: item2, email: item1 }).exec(function(err, results) {
        var length = results.length;
        console.log("ttc");
        console.log(length);
        if (length == 0) {
            var newgen = new Generators({
                email: item1,
                fleetName: item2,
                Euro1: { item1: item3, item2: item4 }
            })
            newgen.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({ Euro1: { item1: item3, item2: item4 } }, function(err, doc) {
                console.log("ppp")
                if (err) throw err;
            });
        }
    })
}
exports.delete = function(item1, item2) {
    Generators.findOneAndDelete({ fleetName: item2, email: item1 }, function(err) {

    });
}
exports.getinfoone = function(item1, item2) {
    Generators.findOne({ Fleetname: item2, email: item1 }, function(err, doc) {
        if (err) throw err;
        else
            return doc;
    });
}