const Generators = require('../models/info13.js');
const Motorcycles = require('../models/info12.js');
const HeavyDutyDieselVehicles = require('../models/info11.js');
const mediumdutydieselvehicles = require('../models/info10.js');
const lightdutydieselvehicles = require('../models/info9.js');
const LightDutyGas = require('../models/info8.js');
const PassengerTruckElectric = require('../models/info7.js');
const passengersmalltrucksdiesel = require('../models/info6.js');
var passengersmalltrucksgas = require('../models/info5.js');
const passengerelectricvehicles = require('../models/info4.js');
const PassengerDissel = require('../models/info3.js');
const Passengergas = require('../models/info2.js');
var mergeJSON = require("merge-json");
const GeneralInfo = require('../models/info1.js');
const Recommendedactions = require('../models/Recommendedactions.js');

exports.sendfleet = function(req, res) {
    var email = req.body.email;
    var fleetname = req.body.fleetname;
    var newjson;
    console.log(req.body);

    Generators.find({ email: email, fleetName: fleetname }).exec(function(err, results) {

        if (err) throw err;
        else {
            var length = results.length;
            if (length == 1) {
                var Euro1 = results[0].Euro1;
                // console.log(results[0].Euro1);
                var json13 = { tbl13: Euro1 }
                console.log(json13);
                console.log("email info");
                console.log(email);
                console.log("fleet Name");
                console.log(fleetname);

                Motorcycles.find({ email: email, fleetName: fleetname }).exec(function(err, results) {

                    if (err) throw err
                    else {
                        console.log(results);
                        
                        var lenght1 = results.length;

                        if (lenght1 == 1) {
                            var Euro2 = results[0].fourstroke;
                            //var Euro2 = results[0].Euro2;
                            
                            console.log("Euro2 Testing");

                            console.log(Euro2);

                            //var Euro3 = results[0].Euro3;
                            var Euro3 = results[0].twostroke;

                            //var Euro4 = results[0].Euro4;
                            var Euro4 = results[0].electric;

                            
                            //var json12 = { tbl12: { item1: Euro2.item1, item2: Euro2.item2, item3: Euro2.item3, item4: Euro3.item1, item5: Euro3.item2, item6: Euro3.item3, item7: Euro4.item1, item8: Euro4.item2, item9: Euro4.item3 } };
                            var json12 = { tbl12: { item1: Euro2.item1, item2: Euro2.item2,  item3: Euro3.item1, item4: Euro3.item2, item5: Euro4.item1, item6: Euro4.item2 } };
                            var cojson = mergeJSON.merge(json13, json12);

                            HeavyDutyDieselVehicles.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                if (err) throw err
                                else {
                                    var length2 = results.length;
                                    if (length2 == 1) {
                                        var Preeuro = results[0].Preeuro;
                                        var Euro1 = results[0].Euro1;
                                        var Euro2 = results[0].Euro2;
                                        var Euro3 = results[0].Euro3;
                                        var Euro4 = results[0].Euro4;
                                        var Euro5 = results[0].Euro5;
                                        var Euro6 = results[0].Euro6;
                                        var json11 = { tbl11: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                        var cojson1 = mergeJSON.merge(cojson, json11);


                                        mediumdutydieselvehicles.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                            if (err) throw err
                                            else {
                                                var length2 = results.length;
                                                if (length2 == 1) {
                                                    var Preeuro = results[0].Preeuro;
                                                    var Euro1 = results[0].Euro1;
                                                    var Euro2 = results[0].Euro2;
                                                    var Euro3 = results[0].Euro3;
                                                    var Euro4 = results[0].Euro4;
                                                    var Euro5 = results[0].Euro5;
                                                    var Euro6 = results[0].Euro6;
                                                    var json10 = { tbl10: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                    var cojson2 = mergeJSON.merge(cojson1, json10);


                                                    lightdutydieselvehicles.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                        if (err) throw err
                                                        else {
                                                            var length3 = results.length;
                                                            if (length3 == 1) {
                                                                var Preeuro = results[0].Preeuro;
                                                                var Euro1 = results[0].Euro1;
                                                                var Euro2 = results[0].Euro2;
                                                                var Euro3 = results[0].Euro3;
                                                                var Euro4 = results[0].Euro4;
                                                                var Euro5 = results[0].Euro5;
                                                                var Euro6 = results[0].Euro6;
                                                                console.log("##" + Preeuro.item3);
                                                                var json9 = { tbl9: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                                var cojson3 = mergeJSON.merge(cojson2, json9);
                                                                console.log(cojson3);

                                                                LightDutyGas.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                                    if (err) throw err
                                                                    else {
                                                                        var length3 = results.length;
                                                                        if (length3 == 1) {
                                                                            var Preeuro = results[0].Preeuro;
                                                                            var Euro1 = results[0].Euro1;
                                                                            var Euro2 = results[0].Euro2;
                                                                            var Euro3 = results[0].Euro3;
                                                                            var Euro4 = results[0].Euro4;
                                                                            var Euro5 = results[0].Euro5;
                                                                            var Euro6 = results[0].Euro6;
                                                                            console.log("##" + Preeuro.item3);
                                                                            var json8 = { tbl8: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                                            var cojson4 = mergeJSON.merge(cojson3, json8);
                                                                            console.log(cojson4);
                                                                            PassengerTruckElectric.find({ email: email, fleetName: fleetname }).exec(function(err, results) {

                                                                                if (err) throw err
                                                                                else {
                                                                                    var length4 = results.length;
                                                                                    if (length4 == 1) {

                                                                                        var Euro2 = results[0].Euro2;
                                                                                        var Euro3 = results[0].Euro3;
                                                                                        var Euro4 = results[0].Euro4;


                                                                                        var json7 = { tbl7: { item1: Euro2.item1, item2: Euro2.item2, item3: Euro2.item3, item4: Euro3.item1, item5: Euro3.item2, item6: Euro3.item3, item7: Euro4.item1, item8: Euro4.item2 } };
                                                                                        var cojson5 = mergeJSON.merge(cojson4, json7);
                                                                                        console.log(cojson5);

                                                                                        passengersmalltrucksdiesel.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                                                            if (err) throw err
                                                                                            else {
                                                                                                var length6 = results.length;
                                                                                                if (length6 == 1) {
                                                                                                    var Preeuro = results[0].Preeuro;
                                                                                                    var Euro1 = results[0].Euro1;
                                                                                                    var Euro2 = results[0].Euro2;
                                                                                                    var Euro3 = results[0].Euro3;
                                                                                                    var Euro4 = results[0].Euro4;
                                                                                                    var Euro5 = results[0].Euro5;
                                                                                                    var Euro6 = results[0].Euro6;
                                                                                                    console.log("##" + Preeuro.item3);
                                                                                                    var json6 = { tbl6: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                                                                    var cojson6 = mergeJSON.merge(cojson5, json6);
                                                                                                    console.log(cojson6);
                                                                                                    passengersmalltrucksgas.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                                                                        if (err) throw err
                                                                                                        else {
                                                                                                            var length6 = results.length;
                                                                                                            if (length6 == 1) {
                                                                                                                var Preeuro = results[0].Preeuro;
                                                                                                                var Euro1 = results[0].Euro1;
                                                                                                                var Euro2 = results[0].Euro2;
                                                                                                                var Euro3 = results[0].Euro3;
                                                                                                                var Euro4 = results[0].Euro4;
                                                                                                                var Euro5 = results[0].Euro5;
                                                                                                                var Euro6 = results[0].Euro6;
                                                                                                                console.log("##" + Preeuro.item3);
                                                                                                                var json5 = { tbl5: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                                                                                var cojson7 = mergeJSON.merge(cojson6, json5);
                                                                                                                console.log(cojson7);

                                                                                                                passengerelectricvehicles.find({ email: email, fleetName: fleetname }).exec(function(err, results) {

                                                                                                                    if (err) throw err
                                                                                                                    else {
                                                                                                                        var length4 = results.length;
                                                                                                                        if (length4 == 1) {

                                                                                                                            var Euro2 = results[0].Euro2;
                                                                                                                            var Euro3 = results[0].Euro3;
                                                                                                                            var Euro4 = results[0].Euro4;


                                                                                                                            var json4 = { tbl4: { item1: Euro2.item1, item2: Euro2.item2, item3: Euro2.item3, item4: Euro3.item1, item5: Euro3.item2, item6: Euro3.item3, item7: Euro4.item1, item8: Euro4.item2 } };
                                                                                                                            var cojson8 = mergeJSON.merge(cojson7, json4);

                                                                                                                            PassengerDissel.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                                                                                                if (err) throw err
                                                                                                                                else {
                                                                                                                                    var length12 = results.length;
                                                                                                                                    if (length12 == 1) {
                                                                                                                                        var Euro1 = results[0].Euro1;
                                                                                                                                        var Euro2 = results[0].Euro2;
                                                                                                                                        var Euro3 = results[0].Euro3;
                                                                                                                                        var Euro4 = results[0].Euro4;
                                                                                                                                        var json3 = { tbl3: { item1: Euro1.item1, item2: Euro1.item2, item3: Euro1.item3, item4: Euro2.item1, item5: Euro2.item2, item6: Euro2.item3, item7: Euro3.item1, item8: Euro3.item2, item9: Euro3.item3, item10: Euro4.item1, item11: Euro4.item2, item12: Euro4.item3 } };
                                                                                                                                        var cosjson9 = mergeJSON.merge(cojson8, json3);
                                                                                                                                        console.log(cosjson9);

                                                                                                                                        Passengergas.find({ email: email, fleetName: fleetname }).exec(function(err, results) {
                                                                                                                                            if (err) throw err
                                                                                                                                            else {
                                                                                                                                                var length13 = results.length;
                                                                                                                                                if (length13 == 1) {
                                                                                                                                                    var Preeuro = results[0].Preeuro;
                                                                                                                                                    var Euro1 = results[0].Euro1;
                                                                                                                                                    var Euro2 = results[0].Euro2;
                                                                                                                                                    var Euro3 = results[0].Euro3;
                                                                                                                                                    var Euro4 = results[0].Euro4;
                                                                                                                                                    var Euro5 = results[0].Euro5;
                                                                                                                                                    var Euro6 = results[0].Euro6;

                                                                                                                                                    var json2 = { tbl2: { item1: Preeuro.item1, item2: Preeuro.item2, item3: Preeuro.item3, item4: Euro1.item1, item5: Euro1.item2, item6: Euro1.item3, item7: Euro2.item1, item8: Euro2.item2, item9: Euro2.item3, item10: Euro3.item1, item11: Euro3.item2, item12: Euro3.item3, item13: Euro4.item1, item14: Euro4.item2, item15: Euro4.item3, item16: Euro5.item1, item17: Euro5.item2, item18: Euro5.item3, item19: Euro6.item1, item20: Euro6.item2, item21: Euro6.item3 } };
                                                                                                                                                    var cojson10 = mergeJSON.merge(cosjson9, json2);
                                                                                                                                                    console.log(cojson10);
                                                                                                                                                    GeneralInfo.find({ email: email, Fleetname: fleetname }).exec(function(err, results) {
                                                                                                                                                        if (err) throw err;
                                                                                                                                                        else {
                                                                                                                                                            var length14 = results.length;
                                                                                                                                                            if (length14 == 1) {

                                                                                                                                                                var item1 = results[0].Fleetname;
                                                                                                                                                                var item2 = results[0].LocalCurrency;
                                                                                                                                                                var item3 = results[0].PetrolPrice;
                                                                                                                                                                var item4 = results[0].Dieselprice;
                                                                                                                                                                var item5 = results[0].ElectricityPrice;

                                                                                                                                                                var item6 = results[0].FossilFuelElec;
                                                                                                                                                                var item7 = results[0].DieselSulphurLevel;
                                                                                                                                                                var json1 = { tbl1: { item1: item1, item2: item2, item3: item3, item4: item4, item5: item5, item6: item6, item7: item7 } };
                                                                                                                                                                var cojson11 = mergeJSON.merge(cojson10, json1);

                                                                                                                                                                var flag = 0;
                                                                                                                                                                Recommendedactions.find({ email: email }).exec(function(err, results) {
                                                                                                                                                                    console.log(email);
                                                                                                                                                                    if (err) throw err;
                                                                                                                                                                    else {
                                                                                                                                                                        var length15 = results.length;
                                                                                                                                                                        if (length15 == 1) {
                                                                                                                                                                            console.log("222222222");
                                                                                                                                                                            var item1 = results[0].hevMileage;
                                                                                                                                                                            var item2 = results[0].hevAdditionalCost;
                                                                                                                                                                            var item3 = results[0].bevMileage;
                                                                                                                                                                            var item4 = results[0].bevAdditionalCost;

                                                                                                                                                                            var item5 = results[0].elecBikeMileage;
                                                                                                                                                                            var item6 = results[0].elecBikeAdditionalCost;
                                                                                                                                                                            var item7 = results[0].bevTrucksMileage;
                                                                                                                                                                            var item8 = results[0].siteElecDemands;
                                                                                                                                                                            var item9 = results[0].pvSystemUnitCost;
                                                                                                                                                                            var json0 = { tbl0: { item1: item1, item2: item2, item3: item3, item4: item4, item5: item5, item6: item6, item7: item7, item8: item8, item9: item9 } };
                                                                                                                                                                            var cojson12 = mergeJSON.merge(cojson11, json0);
                                                                                                                                                                            console.log(cojson12);
                                                                                                                                                                            res.send(cojson12);
                                                                                                                                                                            flag = 1;



                                                                                                                                                                        } else {
                                                                                                                                                                            res.send(cojson11);
                                                                                                                                                                        }
                                                                                                                                                                    }

                                                                                                                                                                })



                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    })
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });


                                                                                                                                    }

                                                                                                                                }
                                                                                                                            })
                                                                                                                        }
                                                                                                                    }
                                                                                                                });

                                                                                                            }
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });



                                                                                    }
                                                                                }
                                                                            })

                                                                        }
                                                                    }
                                                                })



                                                            }
                                                        }
                                                    })


                                                }
                                            }
                                        })

                                    }
                                }
                            })

                        }
                    }


                })
            }


        }
    });


}