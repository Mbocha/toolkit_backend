const Profile = require('../models/profile');
const url = require('url');
var saml = require('saml2-js');
var fs=require('fs');
const emailvalidator = require('email-validator');
var querystring = require('querystring');
var Apione = require('../Api/info1.js');
var Apitwo = require('../Api/info2.js');
var Apithree = require('../Api/info3.js');
var Apifour = require('../Api/info4.js');
var Apifive = require('../Api/info5.js');
var Apisix = require('../Api/info6.js');
var Apiseven = require('../Api/info7.js');
var Apieight = require('../Api/info8.js');
var Apinine = require('../Api/info9.js');
var Apiten = require('../Api/info10.js');
var Apieleven = require('../Api/info11.js');
var Apitwelve = require('../Api/info12.js');
var Apithirteen = require('../Api/infog.js');
var sendfleetdata = require('../Api/senddata.js');
var Apibev = require('../Api/info15.js');
var Apihev = require('../Api/info14.js');
var Apibike = require('../Api/info16.js');
var Apitruck = require('../Api/info17.js');
var Apigenuse = require('../Api/info18.js');
var wait = require('wait-promise');
var mysql = require('mysql');
var newexper;


// Create service provider
var sp_options = {
    entity_id: "https://backend.cleanfleet.fleetforum.org",
    private_key: fs.readFileSync("./saml_cert/server.pem").toString(),
    certificate: fs.readFileSync("./saml_cert/server.crt").toString(),
    assert_endpoint: "https://backend.cleanfleet.fleetforum.org/assert"
};
var sp = new saml.ServiceProvider(sp_options);

// Create identity provider
var idp_options = {
    sso_login_url: "https://login.fleetforum.org/saml2/idp/SSOService.php?spentityid=backend.cleanfleet.fleetforum.org",
    sso_logout_url: "https://login.fleetforum.org/saml2/idp/SingleLogoutService.php",
    certificates: [fs.readFileSync("./saml_cert/idp.crt").toString()]
};
var idp = new saml.IdentityProvider(idp_options);

exports.getmetadata=function (req, res) {
    res.header('Content-Type','text/xml').send(sp.create_metadata());
};
exports.startPage=function (req, res) {
    if(isLogged(req.session)){
        res.json(req.session.LoggedUser);
    }else{
        res.redirect('/login');
    }
};

let option={};
exports.loginPage=function(req, res) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    sp.create_login_request_url(idp,{},function(err, login_url, request_id) {
        if(err){
            console.log(">>>error>>>",err);
            res.send(500);
        }else{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>",login_url);
            let parsedUrl = url.parse(login_url);
            option = querystring.parse(parsedUrl.query);
            res.json(login_url);
        }
    });
};
exports.loginResponse= function(req, res, next) {
console.log("options>>>>>>>>>",option);
    // var options={request_body:{
    //         SAMLRequest:"hZJLb9swEIT%2FisC7RcmWHIuQZLgxihrIw4jcHnIJaHJlE6BIhVzl8e9DywkaFEh6XczstzNkuXzpdPQEzitrKpLGCVnW5WrAo7mDxwE8RkFgfEUGZ5jlXnlmeAeeoWDN6vqKTeOE9c6iFVaTs5h53unvHdx7cBiYJPrzAQ9zEm3WFXmYFYt0XmTtfFHkMhdyLgFkW2R5djHb53tIRDIVMLvgJ4P3A2yMR24w7EjSxSRNJul0ly7YrGB5HmdZdk%2BidciiDMcRdUTsPaNU24MycasBsLVu6GLrDvR0%2FZQq2dOmuW3APSkBcX%2Fsl74HgwpflayEBm5G3z9uEq0%2Bol1a44cO3PuK33dXf8Ff%2Bum5GRJt3zv9oYxU5vB9nfuzyLNfu912sr1tdqQuTznYWI%2Br%2F8%2FtALnkyOPwhCX97C1vAm%2Bz3lqtxGv007qO49fnpHE6TpSctKOUDSYUJ1SrQIZ2tLbPlw44QkXQDUBoXdLPH65%2BAw%3D%3D"
    //     }};
    sp.post_assert(idp, {request_body:req.body}, function(err,saml_response) {
        if(err){
            console.log("error>>>>>>>>>",err);
            res.json(err);
        }else{
            console.log("saml response>>>>>>>>>>>>>>>>>>>>",saml_response);
            var name_id=saml_response.user.name_id;
            var session_index=saml_response.user.session_index;
            var user={};
            user.name_id=name_id;
            user.session_index=session_index;
            req.session.LoggedUser=user;
            console.log("\n>>>>>>>>>>>>name_id>>>"+name_id);
            console.log(">>>>>>>>>>>>session index>>>"+session_index);
            res.json(req.session.LoggedUser);
        }

    });
};
exports.getUserInfo=function(req,res){
	if(isLogged(req.session)){
		res.json(req.session.LoggedUser);
	}else{res.redirect("/login")};
};
exports.logoutPage=function (req, res) {
    var options={
        name_id:req.session.LoggedUser.name_id,
        session_index:req.session.LoggedUser.session_index
    };
    sp.create_logout_request_url(idp,options,function (err,logout_url) {
        if(err)return res.send(500);
        req.session.destroy();
        res.redirect(logout_url);
    })
};
exports.indexPage=function (req, res) {
    if(isLogged(req.session)){
        res.json(req.session.LoggedUser);
    }else{
        res.json('unlogged');
    }
};



exports.login = function(req, res) {
    // var mysql = require('mysql');
    var userEmail = req.body.email;
    var userPassword = req.body.password;

    console.log(userEmail);
    console.log(userPassword);

    // var enteredPassword = mysql.escape(req.body.password);
    var enteredPassword = userPassword.toLowerCase();
    var md5 = require('md5');
    var sha1 = require('sha1');
    var emailvalidflag = emailvalidator.validate(userEmail);
    if (emailvalidflag == false) res.send({ result: "Email invalid" });


    var one = md5(enteredPassword);
    var repeat_size = enteredPassword.length;
    var reverse_res = "";
    for (i = repeat_size - 1; i >= 0; i--) reverse_res += enteredPassword[i];
    var three = sha1(enteredPassword);

    var temp = one + reverse_res + three;
    userPassword = md5(temp.repeat(repeat_size));



    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'users',
        user: 'root',
        password: '',
    });

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }

        console.log('Connected as id ' + connection.threadId);
    });

    // var sql = 'SELECT * FROM ur_users WHERE email = ' + mysql.escape(userEmail) + 'AND password =' + mysql.escape(userPassword);
    // console.log("hashed pass: " + userPassword);
    // console.log("escaped pass: " + mysql.escape(userPassword));

    //var sql = 'SELECT u.id as UserId, u.full_name as FullName, u.email as EmailAddress, u.photo as UserPhoto, u.company_id as CompanyId FROM ur_users u WHERE u.email = ' + mysql.escape(userEmail) + 'AND u.password =' + mysql.escape(userPassword);
    var sql = 'SELECT u.id as UserId, u.full_name as FullName, u.email as EmailAddress, u.photo as UserPhoto, u.company_id as CompanyId, ur_companies.name as CompanyName FROM ur_users u LEFT JOIN ur_companies ON u.company_id = ur_companies.id WHERE u.email = ' + mysql.escape(userEmail) + 'AND u.password =' + mysql.escape(userPassword);

    connection.query(sql, function(error, results, fields) {
        if (error)
            throw error;

        var count = results.length;
        if (count == 1) {
            // object to get user data
            var userInfo = {
                fullname: '',
                email: '',
                organisation: '',
                userImg: ''
            }

            // var userInfo = {
            //     fullname: '',
            //     email: '',
            //     //organisation: '',
            //     userImg: ''
            // }
            userInfo.fullname = results[0].FullName;
            // console.log("userinfo value");
            // console.log(userInfo.fullname);
            userInfo.email = results[0].EmailAddress;
            userInfo.organisation = results[0].CompanyName;
            userInfo.userImg = results[0].UserPhoto;

            console.log("Full Name: " + userInfo.fullname);
            // console.log("Email: "+userInfo.email);
            // console.log("Organisation: "+userInfo.organisation);
            // console.log("Image: "+userInfo.userImg);

            // console.log("send data");
            var sendData = { result: "ok", organ: userInfo.organisation, img: userInfo.userImg, fullname: userInfo.fullname, email: userInfo.email, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTM0NTQzNTQzNTQzNTM0NTMiLCJleHAiOjE1MDQ2OTkyNTZ9.zG-2FvGegujxoLWwIQfNB5IT46D-xC4e8dEDYwi6aRM" };
            //var sendData = { result: "ok", img: userInfo.userImg, fullname: userInfo.fullname, email: userInfo.email, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTM0NTQzNTQzNTQzNTM0NTMiLCJleHAiOjE1MDQ2OTkyNTZ9.zG-2FvGegujxoLWwIQfNB5IT46D-xC4e8dEDYwi6aRM" };
            // console.log(sendData);
            res.send(sendData);
            // res.redirect(req.get('/index'));
        }
        if (count == 0) res.send({ result: "no" });
        // console.log(count);
    });

    connection.end();
}

exports.fleetdata = function(req, res) {
    // console.log(req.body);
    // console.log("check done");
    sendfleetdata.sendfleet(req, res)
}

exports.getprofile = function(req, res) {
    var fullname = req.body.fullName;
    var organ = req.body.organ;
    var expert = req.body.expert;
    var phoneNum = req.body.phoneNum;
    var email = req.body.email;
    var imgurl = req.body.imgurl;
    var query = Profile.findOne({ email: email });
    var emailvalidflag = emailvalidator.validate(email);
    var newProfile = new Profile({ email: email, expert: expert, phoneNum: phoneNum, organ: organ, fullname: fullname, imgurl: imgurl })
    console.log(emailvalidflag);
    if (emailvalidflag == true) {
        newProfile.save(function(err, doc) {
            if (err) throw err

        });

        var newProf = new Profile({ email: email, expert: expert, phoneNum: phoneNum, organ: organ, fullname: fullname, imgurl: imgurl })
        Profile.findOneAndUpdate({ email: email }, { $set: { expert: expert, phoneNum: phoneNum, organ: organ, fullname: fullname } }, function(err, doc) {
            if (err) throw err;
            else {

            }
            res.send({ result: "success" });
        })
    } else {
        res.send({ result: "invalid" });
    }

}

exports.outputprofile = function(req, res) {
    var email = req.body.email;
    // console.log("server testing");
    // console.log(req.body);
    // console.log(email);
    var json = '';
    var emailvalidflag1 = emailvalidator.validate(email);
    var sendemail, sendexpert;
    var sendphoneNum, sendorgan, sendfullname, sendemail, sendimgurl;
    if (emailvalidflag1 == true) {

        // Profile.find({ email: email }).exec(function(error, results) {
        //     if (error) throw error;
        //     else {
        //         var length = results.length;
        //         if (length > 0) {


        // doc = results[0];
        // sendemail = doc.email;
        // sendexpert = doc.expert;

        // sendphoneNum = doc.phoneNum;
        // sendorgan = doc.organ;
        // sendfullname = doc.fullname;
        // sendimgurl = doc.imgurl;
        // json = { expert: sendexpert, organ: sendorgan, fullname: sendfullname, imgurl: sendimgurl, phoneNum: sendphoneNum, email: sendemail };


        console.log("server testing");
        console.log(json);

        newexper = Apione.selectfleetname(email, res);


        //     //     }
        //     // }
        // })

    }

}

exports.tablesleet = function(req, res) {
    //table 1 operation
    console.log(req.body);
    var email = req.body.email;
    var flag = emailvalidator.validate(email);

    if (flag == true) {
        var fleetName = req.body.sendFleet_generalInfo_fleetName;
        console.log("***" + flag);
        var sendFleet_generalInfo_sulphurLevel = req.body.sendFleet_generalInfo_sulphurLevel;
        var sendFleet_generalInfo_localCurrency = req.body.sendFleet_generalInfo_localCurrency;
        var sendFleet_generalInfo_petrolPrice = req.body.sendFleet_generalInfo_petrolPrice;
        var sendFleet_generalInfo_dieselPrice = req.body.sendFleet_generalInfo_dieselPrice;
        var sendFleet_generalInfo_elecPrice = req.body.sendFleet_generalInfo_elecPrice;
        var fleetName = req.body.sendFleet_generalInfo_fleetName;
        var sendFleet_generalInfo_fossilFuelElec = req.body.sendFleet_generalInfo_fossilFuelElec;
        Apione.Insert(email, fleetName, sendFleet_generalInfo_sulphurLevel, sendFleet_generalInfo_localCurrency, sendFleet_generalInfo_petrolPrice, sendFleet_generalInfo_dieselPrice, sendFleet_generalInfo_elecPrice, sendFleet_generalInfo_fossilFuelElec);
        //table 2 operation
        //proeuro operation
        var sendFleet_passengerCarsGasoline_preEuro_numVehicles = req.body.sendFleet_passengerCarsGasoline_preEuro_numVehicles;
        var sendFleet_passengerCarsGasoline_preEuro_annualMileage = req.body.sendFleet_passengerCarsGasoline_preEuro_annualMileage;
        var sendFleet_passengerCarsGasoline_preEuro_annualFuel = req.body.sendFleet_passengerCarsGasoline_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_passengerCarsGasoline_euro1_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro1_numVehicles;
        var sendFleet_passengerCarsGasoline_euro1_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro1_annualMileage;
        var sendFleet_passengerCarsGasoline_euro1_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro1_annualFuel;
        //euro2 operation
        var sendFleet_passengerCarsGasoline_euro2_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro2_numVehicles;
        var sendFleet_passengerCarsGasoline_euro2_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro2_annualMileage;
        var sendFleet_passengerCarsGasoline_euro2_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_passengerCarsGasoline_euro3_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro3_numVehicles;
        var sendFleet_passengerCarsGasoline_euro3_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro3_annualMileage;
        var sendFleet_passengerCarsGasoline_euro3_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_passengerCarsGasoline_euro4_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro4_numVehicles;
        var sendFleet_passengerCarsGasoline_euro4_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro4_annualMileage;
        var sendFleet_passengerCarsGasoline_euro4_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_passengerCarsGasoline_euro5_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro5_numVehicles;
        var sendFleet_passengerCarsGasoline_euro5_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro5_annualMileage;
        var sendFleet_passengerCarsGasoline_euro5_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_passengerCarsGasoline_euro6_numVehicles = req.body.sendFleet_passengerCarsGasoline_euro6_numVehicles;
        var sendFleet_passengerCarsGasoline_euro6_annualMileage = req.body.sendFleet_passengerCarsGasoline_euro6_annualMileage;
        var sendFleet_passengerCarsGasoline_euro6_annualFuel = req.body.sendFleet_passengerCarsGasoline_euro6_annualFuel;
        Apitwo.Insert(email, fleetName, sendFleet_passengerCarsGasoline_preEuro_numVehicles, sendFleet_passengerCarsGasoline_preEuro_annualMileage, sendFleet_passengerCarsGasoline_preEuro_annualFuel, sendFleet_passengerCarsGasoline_euro1_numVehicles, sendFleet_passengerCarsGasoline_euro1_annualMileage, sendFleet_passengerCarsGasoline_euro1_annualFuel, sendFleet_passengerCarsGasoline_euro2_numVehicles, sendFleet_passengerCarsGasoline_euro2_annualMileage, sendFleet_passengerCarsGasoline_euro2_annualFuel, sendFleet_passengerCarsGasoline_euro3_numVehicles, sendFleet_passengerCarsGasoline_euro3_annualMileage, sendFleet_passengerCarsGasoline_euro3_annualFuel, sendFleet_passengerCarsGasoline_euro4_numVehicles, sendFleet_passengerCarsGasoline_euro4_annualMileage, sendFleet_passengerCarsGasoline_euro4_annualFuel, sendFleet_passengerCarsGasoline_euro5_numVehicles, sendFleet_passengerCarsGasoline_euro5_annualMileage, sendFleet_passengerCarsGasoline_euro5_annualFuel, sendFleet_passengerCarsGasoline_euro6_numVehicles, sendFleet_passengerCarsGasoline_euro6_annualMileage, sendFleet_passengerCarsGasoline_euro6_annualFuel);
        //table3
        //euro3
        var sendFleet_passengerCarsDiesel_euro3_numVehicles = req.body.sendFleet_passengerCarsDiesel_euro3_numVehicles;
        var sendFleet_passengerCarsDiesel_euro3_annualMileage = req.body.sendFleet_passengerCarsDiesel_euro3_annualMileage;
        var sendFleet_passengerCarsDiesel_euro3_annualFuel = req.body.sendFleet_passengerCarsDiesel_euro3_annualFuel;
        //euro4
        var sendFleet_passengerCarsDiesel_euro4_numVehicles = req.body.sendFleet_passengerCarsDiesel_euro4_numVehicles;
        var sendFleet_passengerCarsDiesel_euro4_annualMileage = req.body.sendFleet_passengerCarsDiesel_euro4_annualMileage;
        var sendFleet_passengerCarsDiesel_euro4_annualFuel = req.body.sendFleet_passengerCarsDiesel_euro4_annualFuel;
        //euro5
        var sendFleet_passengerCarsDiesel_euro5_numVehicles = req.body.sendFleet_passengerCarsDiesel_euro5_numVehicles;
        var sendFleet_passengerCarsDiesel_euro5_annualMileage = req.body.sendFleet_passengerCarsDiesel_euro5_annualMileage;
        var sendFleet_passengerCarsDiesel_euro5_annualFuel = req.body.sendFleet_passengerCarsDiesel_euro5_annualFuel;
        //euro6
        var sendFleet_passengerCarsDiesel_euro6_numVehicles = req.body.sendFleet_passengerCarsDiesel_euro6_numVehicles;
        var sendFleet_passengerCarsDiesel_euro6_annualMileage = req.body.sendFleet_passengerCarsDiesel_euro6_annualMileage;
        var sendFleet_passengerCarsDiesel_euro6_annualFuel = req.body.sendFleet_passengerCarsDiesel_euro6_annualFuel;
        Apithree.Insert(fleetName, email, sendFleet_passengerCarsDiesel_euro3_numVehicles, sendFleet_passengerCarsDiesel_euro3_annualMileage, sendFleet_passengerCarsDiesel_euro3_annualFuel, sendFleet_passengerCarsDiesel_euro4_numVehicles, sendFleet_passengerCarsDiesel_euro4_annualMileage, sendFleet_passengerCarsDiesel_euro4_annualFuel, sendFleet_passengerCarsDiesel_euro5_numVehicles, sendFleet_passengerCarsDiesel_euro5_annualMileage, sendFleet_passengerCarsDiesel_euro5_annualFuel, sendFleet_passengerCarsDiesel_euro6_numVehicles, sendFleet_passengerCarsDiesel_euro6_annualMileage, sendFleet_passengerCarsDiesel_euro6_annualFuel)
            //table 4 operation
            //one row,
        var sendFleet_passengerCarsElectric_hybridElectric_numVehicles = req.body.sendFleet_passengerCarsElectric_hybridElectric_numVehicles;
        var sendFleet_passengerCarsElectric_hybridElectric_annualMileage = req.body.sendFleet_passengerCarsElectric_hybridElectric_annualMileage;
        var sendFleet_passengerCarsElectric_hybridElectric_annualFuel = req.body.sendFleet_passengerCarsElectric_hybridElectric_annualFuel;
        // two row
        var sendFleet_passengerCarsElectric_plugInHybridElectric_numVehicles = req.body.sendFleet_passengerCarsElectric_plugInHybridElectric_numVehicles;
        var sendFleet_passengerCarsElectric_plugInHybridElectric_annualMileage = req.body.sendFleet_passengerCarsElectric_plugInHybridElectric_annualMileage;
        var sendFleet_passengerCarsElectric_plugInHybridElectric_annualFuel = req.body.sendFleet_passengerCarsElectric_plugInHybridElectric_annualFuel
            // three row
        var sendFleet_passengerCarsElectric_batteryElectric_numVehicles = req.body.sendFleet_passengerCarsElectric_batteryElectric_numVehicles;
        var sendFleet_passengerCarsElectric_batteryElectric_annualMileage = req.body.sendFleet_passengerCarsElectric_batteryElectric_annualMileage;
        var sendFleet_passengerCarsElectric_batteryElectric_annualFuel = req.body.sendFleet_passengerCarsElectric_batteryElectric_annualFuel;
        Apifour.Insert(fleetName, email, sendFleet_passengerCarsElectric_hybridElectric_numVehicles, sendFleet_passengerCarsElectric_hybridElectric_annualMileage, sendFleet_passengerCarsElectric_hybridElectric_annualFuel, sendFleet_passengerCarsElectric_plugInHybridElectric_numVehicles, sendFleet_passengerCarsElectric_plugInHybridElectric_annualMileage, sendFleet_passengerCarsElectric_plugInHybridElectric_annualFuel, sendFleet_passengerCarsElectric_batteryElectric_numVehicles, sendFleet_passengerCarsElectric_batteryElectric_annualMileage, sendFleet_passengerCarsElectric_batteryElectric_annualFuel);
        //table 5 operation
        var sendFleet_passengerSUVsGasoline_preEuro_numVehicles = req.body.sendFleet_passengerSUVsGasoline_preEuro_numVehicles;
        var sendFleet_passengerSUVsGasoline_preEuro_annualMileage = req.body.sendFleet_passengerSUVsGasoline_preEuro_annualMileage;
        var sendFleet_passengerSUVsGasoline_preEuro_annualFuel = req.body.sendFleet_passengerSUVsGasoline_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_passengerSUVsGasoline_euro1_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro1_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro1_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro1_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro1_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro1_annualFuel;
        //euro2 operation
        var sendFleet_passengerSUVsGasoline_euro2_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro2_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro2_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro2_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro2_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_passengerSUVsGasoline_euro3_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro3_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro3_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro3_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro3_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_passengerSUVsGasoline_euro4_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro4_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro4_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro4_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro4_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_passengerSUVsGasoline_euro5_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro5_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro5_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro5_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro5_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_passengerSUVsGasoline_euro6_numVehicles = req.body.sendFleet_passengerSUVsGasoline_euro6_numVehicles;
        var sendFleet_passengerSUVsGasoline_euro6_annualMileage = req.body.sendFleet_passengerSUVsGasoline_euro6_annualMileage;
        var sendFleet_passengerSUVsGasoline_euro6_annualFuel = req.body.sendFleet_passengerSUVsGasoline_euro6_annualFuel;
        Apifive.Insert(email, fleetName, sendFleet_passengerSUVsGasoline_preEuro_numVehicles, sendFleet_passengerSUVsGasoline_preEuro_annualMileage, sendFleet_passengerSUVsGasoline_preEuro_annualFuel, sendFleet_passengerSUVsGasoline_euro1_numVehicles, sendFleet_passengerSUVsGasoline_euro1_annualMileage, sendFleet_passengerSUVsGasoline_euro1_annualFuel, sendFleet_passengerSUVsGasoline_euro2_numVehicles, sendFleet_passengerSUVsGasoline_euro2_annualMileage, sendFleet_passengerSUVsGasoline_euro2_annualFuel, sendFleet_passengerSUVsGasoline_euro3_numVehicles, sendFleet_passengerSUVsGasoline_euro3_annualMileage, sendFleet_passengerSUVsGasoline_euro3_annualFuel, sendFleet_passengerSUVsGasoline_euro4_numVehicles, sendFleet_passengerSUVsGasoline_euro4_annualMileage, sendFleet_passengerSUVsGasoline_euro4_annualFuel, sendFleet_passengerSUVsGasoline_euro5_numVehicles, sendFleet_passengerSUVsGasoline_euro5_annualMileage, sendFleet_passengerSUVsGasoline_euro5_annualFuel, sendFleet_passengerSUVsGasoline_euro6_numVehicles, sendFleet_passengerSUVsGasoline_euro6_annualMileage, sendFleet_passengerSUVsGasoline_euro6_annualFuel);
        //table 6 operation
        var sendFleet_passengerSUVsDiesel_preEuro_numVehicles = req.body.sendFleet_passengerSUVsDiesel_preEuro_numVehicles;
        var sendFleet_passengerSUVsDiesel_preEuro_annualMileage = req.body.sendFleet_passengerSUVsDiesel_preEuro_annualMileage;
        var sendFleet_passengerSUVsDiesel_preEuro_annualFuel = req.body.sendFleet_passengerSUVsDiesel_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_passengerSUVsDiesel_euro1_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro1_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro1_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro1_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro1_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro1_annualFuel;
        //euro2 operation
        var sendFleet_passengerSUVsDiesel_euro2_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro2_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro2_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro2_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro2_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_passengerSUVsDiesel_euro3_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro3_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro3_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro3_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro3_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_passengerSUVsDiesel_euro4_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro4_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro4_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro4_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro4_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_passengerSUVsDiesel_euro5_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro5_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro5_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro5_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro5_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_passengerSUVsDiesel_euro6_numVehicles = req.body.sendFleet_passengerSUVsDiesel_euro6_numVehicles;
        var sendFleet_passengerSUVsDiesel_euro6_annualMileage = req.body.sendFleet_passengerSUVsDiesel_euro6_annualMileage;
        var sendFleet_passengerSUVsDiesel_euro6_annualFuel = req.body.sendFleet_passengerSUVsDiesel_euro6_annualFuel;
        Apisix.Insert(email, fleetName, sendFleet_passengerSUVsDiesel_preEuro_numVehicles, sendFleet_passengerSUVsDiesel_preEuro_annualMileage, sendFleet_passengerSUVsDiesel_preEuro_annualFuel, sendFleet_passengerSUVsDiesel_euro1_numVehicles, sendFleet_passengerSUVsDiesel_euro1_annualMileage, sendFleet_passengerSUVsDiesel_euro1_annualFuel, sendFleet_passengerSUVsDiesel_euro2_numVehicles, sendFleet_passengerSUVsDiesel_euro2_annualMileage, sendFleet_passengerSUVsDiesel_euro2_annualFuel, sendFleet_passengerSUVsDiesel_euro3_numVehicles, sendFleet_passengerSUVsDiesel_euro3_annualMileage, sendFleet_passengerSUVsDiesel_euro3_annualFuel, sendFleet_passengerSUVsDiesel_euro4_numVehicles, sendFleet_passengerSUVsDiesel_euro4_annualMileage, sendFleet_passengerSUVsDiesel_euro4_annualFuel, sendFleet_passengerSUVsDiesel_euro5_numVehicles, sendFleet_passengerSUVsDiesel_euro5_annualMileage, sendFleet_passengerSUVsDiesel_euro5_annualFuel, sendFleet_passengerSUVsDiesel_euro6_numVehicles, sendFleet_passengerSUVsDiesel_euro6_annualMileage, sendFleet_passengerSUVsDiesel_euro6_annualFuel);
        //tableseven operation
        //table 7 operation
        //one row,
        var sendFleet_passengerSUVsElectric_hybridElectric_numVehicles = req.body.sendFleet_passengerSUVsElectric_hybridElectric_numVehicles;
        var sendFleet_passengerSUVsElectric_hybridElectric_annualMileage = req.body.sendFleet_passengerSUVsElectric_hybridElectric_annualMileage;
        var sendFleet_passengerSUVsElectric_hybridElectric_annualFuel = req.body.sendFleet_passengerSUVsElectric_hybridElectric_annualFuel;
        // two row
        var sendFleet_passengerSUVsElectric_plugInHybridElectric_numVehicles = req.body.sendFleet_passengerSUVsElectric_plugInHybridElectric_numVehicles;
        var sendFleet_passengerSUVsElectric_plugInHybridElectric_annualMileage = req.body.sendFleet_passengerSUVsElectric_plugInHybridElectric_annualMileage;
        var sendFleet_passengerSUVsElectric_plugInHybridElectric_annualFuel = req.body.sendFleet_passengerSUVsElectric_plugInHybridElectric_annualFuel
            // three row
        var sendFleet_passengerSUVsElectric_batteryElectric_numVehicles = req.body.sendFleet_passengerSUVsElectric_batteryElectric_numVehicles;
        var sendFleet_passengerSUVsElectric_batteryElectric_annualMileage = req.body.sendFleet_passengerSUVsElectric_batteryElectric_annualMileage;
        var sendFleet_passengerSUVsElectric_batteryElectric_annualFuel = req.body.sendFleet_passengerSUVsElectric_batteryElectric_annualFuel;
        Apiseven.Insert(fleetName, email, sendFleet_passengerSUVsElectric_hybridElectric_numVehicles, sendFleet_passengerSUVsElectric_hybridElectric_annualMileage, sendFleet_passengerSUVsElectric_hybridElectric_annualFuel, sendFleet_passengerSUVsElectric_plugInHybridElectric_numVehicles, sendFleet_passengerSUVsElectric_plugInHybridElectric_annualMileage, sendFleet_passengerSUVsElectric_plugInHybridElectric_annualFuel, sendFleet_passengerSUVsElectric_batteryElectric_numVehicles, sendFleet_passengerSUVsElectric_batteryElectric_annualMileage, sendFleet_passengerSUVsElectric_batteryElectric_annualFuel);
        //table eight operation
        //proeuro operation
        var sendFleet_lDVsGasoline_preEuro_numVehicles = req.body.sendFleet_lDVsGasoline_preEuro_numVehicles;
        var sendFleet_lDVsGasoline_preEuro_annualMileage = req.body.sendFleet_lDVsGasoline_preEuro_annualMileage;
        var sendFleet_lDVsGasoline_preEuro_annualFuel = req.body.sendFleet_lDVsGasoline_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_lDVsGasoline_euro1_numVehicles = req.body.sendFleet_lDVsGasoline_euro1_numVehicles;
        var sendFleet_lDVsGasoline_euro1_annualMileage = req.body.sendFleet_lDVsGasoline_euro1_annualMileage;
        var sendFleet_lDVsGasoline_euro1_annualFuel = req.body.sendFleet_lDVsGasoline_euro1_annualFuel;
        //euro2 operation
        var sendFleet_lDVsGasoline_euro2_numVehicles = req.body.sendFleet_lDVsGasoline_euro2_numVehicles;
        var sendFleet_lDVsGasoline_euro2_annualMileage = req.body.sendFleet_lDVsGasoline_euro2_annualMileage;
        var sendFleet_lDVsGasoline_euro2_annualFuel = req.body.sendFleet_lDVsGasoline_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_lDVsGasoline_euro3_numVehicles = req.body.sendFleet_lDVsGasoline_euro3_numVehicles;
        var sendFleet_lDVsGasoline_euro3_annualMileage = req.body.sendFleet_lDVsGasoline_euro3_annualMileage;
        var sendFleet_lDVsGasoline_euro3_annualFuel = req.body.sendFleet_lDVsGasoline_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_lDVsGasoline_euro4_numVehicles = req.body.sendFleet_lDVsGasoline_euro4_numVehicles;
        var sendFleet_lDVsGasoline_euro4_annualMileage = req.body.sendFleet_lDVsGasoline_euro4_annualMileage;
        var sendFleet_lDVsGasoline_euro4_annualFuel = req.body.sendFleet_lDVsGasoline_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_lDVsGasoline_euro5_numVehicles = req.body.sendFleet_lDVsGasoline_euro5_numVehicles;
        var sendFleet_lDVsGasoline_euro5_annualMileage = req.body.sendFleet_lDVsGasoline_euro5_annualMileage;
        var sendFleet_lDVsGasoline_euro5_annualFuel = req.body.sendFleet_lDVsGasoline_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_lDVsGasoline_euro6_numVehicles = req.body.sendFleet_lDVsGasoline_euro6_numVehicles;
        var sendFleet_lDVsGasoline_euro6_annualMileage = req.body.sendFleet_lDVsGasoline_euro6_annualMileage;
        var sendFleet_lDVsGasoline_euro6_annualFuel = req.body.sendFleet_lDVsGasoline_euro6_annualFuel;
        Apieight.Insert(email, fleetName, sendFleet_lDVsGasoline_preEuro_numVehicles, sendFleet_lDVsGasoline_preEuro_annualMileage, sendFleet_lDVsGasoline_preEuro_annualFuel, sendFleet_lDVsGasoline_euro1_numVehicles, sendFleet_lDVsGasoline_euro1_annualMileage, sendFleet_lDVsGasoline_euro1_annualFuel, sendFleet_lDVsGasoline_euro2_numVehicles, sendFleet_lDVsGasoline_euro2_annualMileage, sendFleet_lDVsGasoline_euro2_annualFuel, sendFleet_lDVsGasoline_euro3_numVehicles, sendFleet_lDVsGasoline_euro3_annualMileage, sendFleet_lDVsGasoline_euro3_annualFuel, sendFleet_lDVsGasoline_euro4_numVehicles, sendFleet_lDVsGasoline_euro4_annualMileage, sendFleet_lDVsGasoline_euro4_annualFuel, sendFleet_lDVsGasoline_euro5_numVehicles, sendFleet_lDVsGasoline_euro5_annualMileage, sendFleet_lDVsGasoline_euro5_annualFuel, sendFleet_lDVsGasoline_euro6_numVehicles, sendFleet_lDVsGasoline_euro6_annualMileage, sendFleet_lDVsGasoline_euro6_annualFuel);
        //proeuro operation
        //table nine operation
        var sendFleet_lDVsDiesel_preEuro_numVehicles = req.body.sendFleet_lDVsDiesel_preEuro_numVehicles;
        var sendFleet_lDVsDiesel_preEuro_annualMileage = req.body.sendFleet_lDVsDiesel_preEuro_annualMileage;
        var sendFleet_lDVsDiesel_preEuro_annualFuel = req.body.sendFleet_lDVsDiesel_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_lDVsDiesel_euro1_numVehicles = req.body.sendFleet_lDVsDiesel_euro1_numVehicles;
        var sendFleet_lDVsDiesel_euro1_annualMileage = req.body.sendFleet_lDVsDiesel_euro1_annualMileage;
        var sendFleet_lDVsDiesel_euro1_annualFuel = req.body.sendFleet_lDVsDiesel_euro1_annualFuel;
        //euro2 operation
        var sendFleet_lDVsDiesel_euro2_numVehicles = req.body.sendFleet_lDVsDiesel_euro2_numVehicles;
        var sendFleet_lDVsDiesel_euro2_annualMileage = req.body.sendFleet_lDVsDiesel_euro2_annualMileage;
        var sendFleet_lDVsDiesel_euro2_annualFuel = req.body.sendFleet_lDVsDiesel_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_lDVsDiesel_euro3_numVehicles = req.body.sendFleet_lDVsDiesel_euro3_numVehicles;
        var sendFleet_lDVsDiesel_euro3_annualMileage = req.body.sendFleet_lDVsDiesel_euro3_annualMileage;
        var sendFleet_lDVsDiesel_euro3_annualFuel = req.body.sendFleet_lDVsDiesel_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_lDVsDiesel_euro4_numVehicles = req.body.sendFleet_lDVsDiesel_euro4_numVehicles;
        var sendFleet_lDVsDiesel_euro4_annualMileage = req.body.sendFleet_lDVsDiesel_euro4_annualMileage;
        var sendFleet_lDVsDiesel_euro4_annualFuel = req.body.sendFleet_lDVsDiesel_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_lDVsDiesel_euro5_numVehicles = req.body.sendFleet_lDVsDiesel_euro5_numVehicles;
        var sendFleet_lDVsDiesel_euro5_annualMileage = req.body.sendFleet_lDVsDiesel_euro5_annualMileage;
        var sendFleet_lDVsDiesel_euro5_annualFuel = req.body.sendFleet_lDVsDiesel_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_lDVsDiesel_euro6_numVehicles = req.body.sendFleet_lDVsDiesel_euro6_numVehicles;
        var sendFleet_lDVsDiesel_euro6_annualMileage = req.body.sendFleet_lDVsDiesel_euro6_annualMileage;
        var sendFleet_lDVsDiesel_euro6_annualFuel = req.body.sendFleet_lDVsDiesel_euro6_annualFuel;
        Apinine.Insert(email, fleetName, sendFleet_lDVsDiesel_preEuro_numVehicles, sendFleet_lDVsDiesel_preEuro_annualMileage, sendFleet_lDVsDiesel_preEuro_annualFuel, sendFleet_lDVsDiesel_euro1_numVehicles, sendFleet_lDVsDiesel_euro1_annualMileage, sendFleet_lDVsDiesel_euro1_annualFuel, sendFleet_lDVsDiesel_euro2_numVehicles, sendFleet_lDVsDiesel_euro2_annualMileage, sendFleet_lDVsDiesel_euro2_annualFuel, sendFleet_lDVsDiesel_euro3_numVehicles, sendFleet_lDVsDiesel_euro3_annualMileage, sendFleet_lDVsDiesel_euro3_annualFuel, sendFleet_lDVsDiesel_euro4_numVehicles, sendFleet_lDVsDiesel_euro4_annualMileage, sendFleet_lDVsDiesel_euro4_annualFuel, sendFleet_lDVsDiesel_euro5_numVehicles, sendFleet_lDVsDiesel_euro5_annualMileage, sendFleet_lDVsDiesel_euro5_annualFuel, sendFleet_lDVsDiesel_euro6_numVehicles, sendFleet_lDVsDiesel_euro6_annualMileage, sendFleet_lDVsDiesel_euro6_annualFuel);
        //table ten operation
        //preeuro
        var sendFleet_mDVsDiesel_preEuro_numVehicles = req.body.sendFleet_mDVsDiesel_preEuro_numVehicles;
        var sendFleet_mDVsDiesel_preEuro_annualMileage = req.body.sendFleet_mDVsDiesel_preEuro_annualMileage;
        var sendFleet_mDVsDiesel_preEuro_annualFuel = req.body.sendFleet_mDVsDiesel_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_mDVsDiesel_euro1_numVehicles = req.body.sendFleet_mDVsDiesel_euro1_numVehicles;
        var sendFleet_mDVsDiesel_euro1_annualMileage = req.body.sendFleet_mDVsDiesel_euro1_annualMileage;
        var sendFleet_mDVsDiesel_euro1_annualFuel = req.body.sendFleet_mDVsDiesel_euro1_annualFuel;
        //euro2 operation
        var sendFleet_mDVsDiesel_euro2_numVehicles = req.body.sendFleet_mDVsDiesel_euro2_numVehicles;
        var sendFleet_mDVsDiesel_euro2_annualMileage = req.body.sendFleet_mDVsDiesel_euro2_annualMileage;
        var sendFleet_mDVsDiesel_euro2_annualFuel = req.body.sendFleet_mDVsDiesel_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_mDVsDiesel_euro3_numVehicles = req.body.sendFleet_mDVsDiesel_euro3_numVehicles;
        var sendFleet_mDVsDiesel_euro3_annualMileage = req.body.sendFleet_mDVsDiesel_euro3_annualMileage;
        var sendFleet_mDVsDiesel_euro3_annualFuel = req.body.sendFleet_mDVsDiesel_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_mDVsDiesel_euro4_numVehicles = req.body.sendFleet_mDVsDiesel_euro4_numVehicles;
        var sendFleet_mDVsDiesel_euro4_annualMileage = req.body.sendFleet_mDVsDiesel_euro4_annualMileage;
        var sendFleet_mDVsDiesel_euro4_annualFuel = req.body.sendFleet_mDVsDiesel_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_mDVsDiesel_euro5_numVehicles = req.body.sendFleet_mDVsDiesel_euro5_numVehicles;
        var sendFleet_mDVsDiesel_euro5_annualMileage = req.body.sendFleet_mDVsDiesel_euro5_annualMileage;
        var sendFleet_mDVsDiesel_euro5_annualFuel = req.body.sendFleet_mDVsDiesel_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_mDVsDiesel_euro6_numVehicles = req.body.sendFleet_mDVsDiesel_euro6_numVehicles;
        var sendFleet_mDVsDiesel_euro6_annualMileage = req.body.sendFleet_mDVsDiesel_euro6_annualMileage;
        var sendFleet_mDVsDiesel_euro6_annualFuel = req.body.sendFleet_mDVsDiesel_euro6_annualFuel;
        Apiten.Insert(email, fleetName, sendFleet_mDVsDiesel_preEuro_numVehicles, sendFleet_mDVsDiesel_preEuro_annualMileage, sendFleet_mDVsDiesel_preEuro_annualFuel, sendFleet_mDVsDiesel_euro1_numVehicles, sendFleet_mDVsDiesel_euro1_annualMileage, sendFleet_mDVsDiesel_euro1_annualFuel, sendFleet_mDVsDiesel_euro2_numVehicles, sendFleet_mDVsDiesel_euro2_annualMileage, sendFleet_mDVsDiesel_euro2_annualFuel, sendFleet_mDVsDiesel_euro3_numVehicles, sendFleet_mDVsDiesel_euro3_annualMileage, sendFleet_mDVsDiesel_euro3_annualFuel, sendFleet_mDVsDiesel_euro4_numVehicles, sendFleet_mDVsDiesel_euro4_annualMileage, sendFleet_mDVsDiesel_euro4_annualFuel, sendFleet_mDVsDiesel_euro5_numVehicles, sendFleet_mDVsDiesel_euro5_annualMileage, sendFleet_mDVsDiesel_euro5_annualFuel, sendFleet_mDVsDiesel_euro6_numVehicles, sendFleet_mDVsDiesel_euro6_annualMileage, sendFleet_mDVsDiesel_euro6_annualFuel);
        //table eleven operation
        //preeuro
        var sendFleet_hDVsDiesel_preEuro_numVehicles = req.body.sendFleet_hDVsDiesel_preEuro_numVehicles;
        var sendFleet_hDVsDiesel_preEuro_annualMileage = req.body.sendFleet_hDVsDiesel_preEuro_annualMileage;
        var sendFleet_hDVsDiesel_preEuro_annualFuel = req.body.sendFleet_hDVsDiesel_preEuro_annualFuel;
        //euro1 operation
        var sendFleet_hDVsDiesel_euro1_numVehicles = req.body.sendFleet_hDVsDiesel_euro1_numVehicles;
        var sendFleet_hDVsDiesel_euro1_annualMileage = req.body.sendFleet_hDVsDiesel_euro1_annualMileage;
        var sendFleet_hDVsDiesel_euro1_annualFuel = req.body.sendFleet_hDVsDiesel_euro1_annualFuel;
        //euro2 operation
        var sendFleet_hDVsDiesel_euro2_numVehicles = req.body.sendFleet_hDVsDiesel_euro2_numVehicles;
        var sendFleet_hDVsDiesel_euro2_annualMileage = req.body.sendFleet_hDVsDiesel_euro2_annualMileage;
        var sendFleet_hDVsDiesel_euro2_annualFuel = req.body.sendFleet_hDVsDiesel_euro2_annualFuel;
        //euro 3 operation
        var sendFleet_hDVsDiesel_euro3_numVehicles = req.body.sendFleet_hDVsDiesel_euro3_numVehicles;
        var sendFleet_hDVsDiesel_euro3_annualMileage = req.body.sendFleet_hDVsDiesel_euro3_annualMileage;
        var sendFleet_hDVsDiesel_euro3_annualFuel = req.body.sendFleet_hDVsDiesel_euro3_annualFuel;
        //euro 4 operation
        var sendFleet_hDVsDiesel_euro4_numVehicles = req.body.sendFleet_hDVsDiesel_euro4_numVehicles;
        var sendFleet_hDVsDiesel_euro4_annualMileage = req.body.sendFleet_hDVsDiesel_euro4_annualMileage;
        var sendFleet_hDVsDiesel_euro4_annualFuel = req.body.sendFleet_hDVsDiesel_euro4_annualFuel;
        //euro 5 operation
        var sendFleet_hDVsDiesel_euro5_numVehicles = req.body.sendFleet_hDVsDiesel_euro5_numVehicles;
        var sendFleet_hDVsDiesel_euro5_annualMileage = req.body.sendFleet_hDVsDiesel_euro5_annualMileage;
        var sendFleet_hDVsDiesel_euro5_annualFuel = req.body.sendFleet_hDVsDiesel_euro5_annualFuel;
        //euro 6 operation
        var sendFleet_hDVsDiesel_euro6_numVehicles = req.body.sendFleet_hDVsDiesel_euro6_numVehicles;
        var sendFleet_hDVsDiesel_euro6_annualMileage = req.body.sendFleet_hDVsDiesel_euro6_annualMileage;
        var sendFleet_hDVsDiesel_euro6_annualFuel = req.body.sendFleet_hDVsDiesel_euro6_annualFuel;
        Apieleven.Insert(email, fleetName, sendFleet_hDVsDiesel_preEuro_numVehicles, sendFleet_hDVsDiesel_preEuro_annualMileage, sendFleet_hDVsDiesel_preEuro_annualFuel, sendFleet_hDVsDiesel_euro1_numVehicles, sendFleet_hDVsDiesel_euro1_annualMileage, sendFleet_hDVsDiesel_euro1_annualFuel, sendFleet_hDVsDiesel_euro2_numVehicles, sendFleet_hDVsDiesel_euro2_annualMileage, sendFleet_hDVsDiesel_euro2_annualFuel, sendFleet_hDVsDiesel_euro3_numVehicles, sendFleet_hDVsDiesel_euro3_annualMileage, sendFleet_hDVsDiesel_euro3_annualFuel, sendFleet_hDVsDiesel_euro4_numVehicles, sendFleet_hDVsDiesel_euro4_annualMileage, sendFleet_hDVsDiesel_euro4_annualFuel, sendFleet_hDVsDiesel_euro5_numVehicles, sendFleet_hDVsDiesel_euro5_annualMileage, sendFleet_hDVsDiesel_euro5_annualFuel, sendFleet_hDVsDiesel_euro6_numVehicles, sendFleet_hDVsDiesel_euro6_annualMileage, sendFleet_hDVsDiesel_euro6_annualFuel);
        //tabletwelve operation
        //one row,
        var sendFleet_motorCycles_fourStroke_numVehicles = req.body.sendFleet_motorCycles_fourStroke_numVehicles;
        var sendFleet_motorCycles_fourStroke_annualMileage = req.body.sendFleet_motorCycles_fourStroke_annualMileage;
        var sendFleet_motorCycles_fourStroke_annualFuel = req.body.sendFleet_motorCycles_fourStroke_annualFuel;
        // two row
        var sendFleet_motorCycles_twoStroke_numVehicles = req.body.sendFleet_motorCycles_twoStroke_numVehicles;
        var sendFleet_motorCycles_twoStroke_annualMileage = req.body.sendFleet_motorCycles_twoStroke_annualMileage;
        var sendFleet_motorCycles_twoStroke_annualFuel = req.body.sendFleet_motorCycles_twoStroke_annualFuel
            // three row
        var sendFleet_motorCycles_electric_numVehicles = req.body.sendFleet_motorCycles_electric_numVehicles;
        var sendFleet_motorCycles_electric_annualMileage = req.body.sendFleet_motorCycles_electric_annualMileage;
        var sendFleet_motorCycles_electric_annualFuel = req.body.sendFleet_motorCycles_electric_annualFuel;
        Apitwelve.Insert(fleetName, email, sendFleet_motorCycles_fourStroke_numVehicles, sendFleet_motorCycles_fourStroke_annualMileage, sendFleet_motorCycles_fourStroke_annualFuel, sendFleet_motorCycles_twoStroke_numVehicles, sendFleet_motorCycles_twoStroke_annualMileage, sendFleet_motorCycles_twoStroke_annualFuel, sendFleet_motorCycles_electric_numVehicles, sendFleet_motorCycles_electric_annualMileage, sendFleet_motorCycles_electric_annualFuel);
        //table thirtenn
        var sendFleet_generators_diesel_numVehicles = req.body.sendFleet_generators_diesel_numVehicles;
        var sendFleet_generators_diesel_annualFuel = req.body.sendFleet_generators_diesel_annualFuel;
        Apithirteen.Insert(email, fleetName, sendFleet_generators_diesel_numVehicles, sendFleet_generators_diesel_annualFuel);
        Apihev.Insert(email, "", "");
    }

}

exports.delfleet = function(req, res) {
    var email = req.body.email;
    var fleetname = req.body.fleetname;
    console.log(email);
    console.log(fleetname);
    Apione.delete(email, fleetname);
    Apitwo.delete(email, fleetname);
    Apithree.delete(email, fleetname);
    Apifour.delete(email, fleetname);
    Apifive.delete(email, fleetname);
    Apisix.delete(email, fleetname);
    Apiseven.delete(email, fleetname);
    Apieight.delete(email, fleetname);
    Apinine.delete(email, fleetname);
    Apiten.delete(email, fleetname);
    Apieleven.delete(email, fleetname);
    Apitwelve.delete(email, fleetname);
    Apithirteen.delete(email, fleetname);
    Apibev.delete(email);
    Apibike.delete(email);
    Apihev.delete(email);
    Apitruck.delete(email);
    Apigenuse.delete(email);
}

exports.bevin = function(req, res) {
    var email = req.body.email;
    var item1 = req.body.item1;
    var item2 = req.body.item2;
    Apibev.Insert(email, item1, item2);
}

exports.hevin = function(req, res) {
    var email = req.body.email;
    var item1 = req.body.item1;
    var item2 = req.body.item2;
    console.log(item2);
    Apihev.Insert(email, item1, item2);


}

exports.ElecMotorin = function(req, res) {
    var email = req.body.email;
    var item1 = req.body.item1;
    var item2 = req.body.item2;
    Apibike.Insert(email, item1, item2);

}

exports.ElecTruckin = function(req, res) {
    var email = req.body.email;
    var item1 = req.body.item1;
    Apitruck.Insert(email, item1);
}

exports.Elecin = function(req, res) {
    var email = req.body.email;
    var item1 = req.body.item1;
    var item2 = req.body.item2;
    Apigenuse.Insert(email, item1, item2);

};
function isLogged(session) {
    return (session.LoggedUser!==null)
}
