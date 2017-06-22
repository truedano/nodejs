var express = require('express');
var app = express();
var path = require("path");
var port = 3000;
var mydbClass = require("./model/mydb.js");
var mydb = new mydbClass();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route//////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/user',function(req, res){
    res.sendFile(path.join(__dirname+'/view/user.html'));
});

app.post('/user',function(req, res){
    console.log("post to user");
});

app.get('/check_user', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('/seller',function(req, res){
    res.sendFile(path.join(__dirname+'/view/seller.html'));
});

app.post('/seller',function(req, res){
    console.log("post to seller");
});

app.get('/check_seller', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('/admin',function(req, res){
    res.sendFile(path.join(__dirname+'/view/admin.html'));
});

app.get('/check_admin', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get("/mydb",function(req, res){
    var dbname = req.query.dbname;
    var type = req.query.type;

    console.log("get mydb","dbname="+dbname,"type="+type,"ip="+req.ip);
    if( type == "all" ){
        mydb.findAll(dbname,function(result){
            res.send(JSON.stringify(result));
        });
    }else if( type == "one" ){

    }
});

app.post("/mydb",function(req, res){
    var dbname = req.query.dbname;
    var type = req.query.type;

    console.log("post mydb","dbname="+dbname,"type="+type,"ip="+req.ip);
    if( dbname == "menu" ){
        if( type == "delall" ){
            mydb.drop(dbname,function(err, delOK){
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "delone" ){
            var myquery = {
                number:req.body.number,
                name:req.body.name,
                price:req.body.price,
                descript:req.body.descript,
                time: req.body.time
            };
            mydb.remove(dbname,myquery,function(err, obj){
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "modifyone" ){
            var myquery = {
                time: req.body.time
            };
            var newvalues = {
                number:req.body.number,
                name:req.body.name,
                price:req.body.price,
                descript:req.body.descript,
                time: req.body.time
            };
            mydb.update(dbname,myquery,newvalues,function(err, obj){
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "insertone" ){
            var obj={
                number:req.body.number,
                name:req.body.name,
                price:req.body.price,
                descript:req.body.descript,
                time: req.body.time
            };
            mydb.insert("menu",obj,function(err,obj){
                res.send(JSON.stringify({success: true}));
            });
        }
    }else if( dbname == "others" ){
        var myquery = {
            name : req.body.name
        };
        mydb.remove(dbname,myquery,function(err, obj){
            myquery['value'] = req.body.value;
            mydb.insert(dbname,myquery,function(err,obj){
                res.send(JSON.stringify({success: true}));
            });
        });
    }
    
});
//route//////////////////////////////////////////////////////////////////

//static/////////////////////////////////////////////////////////////////
app.use('/static', express.static(__dirname + '/static'));

app.listen(port, function () {
    console.log('Server listening on port '+port+" "+new Date());

    //mydb.findAll("menu",function(result){
    //    console.log(result);
    //});
});