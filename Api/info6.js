var passengersmalldieseltruck  = require('../models/info6.js');
exports.Insert = function(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19, item20, item21, item22, item23) {
    passengersmalldieseltruck .find({ fleetName: item2, email: item1 }).exec(function(err, results) {
        var length = results.length;
        console.log(length);
        if (length == 0) {
            var newpassen = new passengersmalldieseltruck({
                email: item1,
                fleetName: item2,

                Preeuro: { item1: item3, item2: item4, item3: item5 },
                Euro1: { item1: item6, item2: item7, item3: item8 },
                Euro2: { item1: item9, item2: item10, item3: item11 },
                Euro3: { item1: item12, item2: item13, item3: item14 },
                Euro4: { item1: item15, item2: item16, item3: item17 },
                Euro5: { item1: item18, item2: item19, item3: item20 },
                Euro6: { item1: item21, item2: item22, item3: item23 }

            });
            newpassen.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({
                Preeuro: { item1: item3, item2: item4, item3: item5 },
                Euro1: { item1: item6, item2: item7, item3: item8 },
                Euro2: { item1: item9, item2: item10, item3: item11 },
                Euro3: { item1: item12, item2: item13, item3: item14 },
                Euro4: { item1: item15, item2: item16, item3: item17 },
                Euro5: { item1: item18, item2: item19, item3: item20 },
                Euro6: { item1: item21, item2: item22, item3: item23 }
            }, function(err, doc) {
                if (err) throw err;
            });
        }
    })

}
exports.delete = function(item1, item2) {
    passengersmalldieseltruck .findOneAndDelete({ fleetName: item2, email: item1 }, function(err) {

    });
}
exports.change = function(item1, item2) {
    passengersmalldieseltruck .findOne({ fleetName: item2, email: item1 }, function(err, doc) {
        if (err) throw err;
        else
            return doc;
    });
}