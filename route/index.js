const express = require('express');
const passport = require('passport');
const router = express.Router();
const indexcontroller = require('../controller/index');

// Access URL for implementing SP-init SSO
router.get("/test",function (req, res) {
    console.log(">>>>>>>>>>>>>success>>>>>");
    res.json("success")
});
router.get('/',indexcontroller.startPage);
router.get('/login', indexcontroller.loginPage);
router.get('/index',indexcontroller.indexPage);
router.get('/logout',indexcontroller.logoutPage);
// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to
router.post('/assert',indexcontroller.loginResponse);
router.get('/assert',indexcontroller.getUserInfo);

router.post('/profilein', indexcontroller.getprofile);
router.post('/profileout', indexcontroller.outputprofile);
router.post('/fleetin', indexcontroller.tablesleet);
router.post('/fleetRequest', indexcontroller.fleetdata);
router.post('/del', indexcontroller.delfleet);
router.post('/bev', indexcontroller.bevin);
router.post('/hev', indexcontroller.hevin);
router.post('/ElecMotor', indexcontroller.ElecMotorin);
router.post('/ElecTruck', indexcontroller.ElecTruckin);
router.post('/Elec', indexcontroller.Elecin);
router.post('/api/authenticate', indexcontroller.login);
// router.get('/api/authenticate', function(req, res) {
//     console.log("server trans");
// });
module.exports = router;
