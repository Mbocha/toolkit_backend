const Recommendedactions = require('../models/Recommendedactions.js');
exports.Insert = function(item1, item2,item3) {
    Recommendedactions.find({ email: item1 }).exec(function(err, results) {
        if(err) throw err
       else{ 
        var length = results.length;
        console.log(length);
        if (length == 0) {
            var newpassen = new Recommendedactions({
                email: item1,
                siteElecDemands:item2,
                pvSystemUnitCost:item3

            });
            newpassen.save(function(err) {
                if (err) throw err;
            })
        } else {
            results[0].update({
                siteElecDemands:item2,
                pvSystemUnitCost:item3
              
            }, function(err, doc) {
                if (err) throw err;
            });
        }
    }
    })

}
exports.delete = function(item1) {
    Recommendedactions.findOneAndDelete({ email: item1 }, function(err, results) {

    });
}
exports.change = function(item1) {
    Recommendedactions.findOne({  email: item1 }, function(err, doc) {
        if (err) throw err;
        else
            return doc;
    });
}