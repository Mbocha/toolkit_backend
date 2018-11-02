var express=require("express");
var app=express();
var port=8443;

app.set('port', process.env.PORT || port);
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');


const configDB = require('./config/database.js');
const routes=require('./route/index');

const fs = require('fs');
var https = require('http');
var options = {
    key: fs.readFileSync('./ssl_cert/privkey.pem'),
    cert: fs.readFileSync('./ssl_cert/cert.pem')
};
var server = https.createServer( app);

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
 
mongoose.connect(configDB.url,function(err)
{
    if(err)
    {
        throw err;
    }
    else{
        console.log("mongodb successful connection")
    }
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use('/', routes);
server.listen(port, function(){
    console.log("Express listening via port:" + port);
});

module.exports = app;
