var express = require('express');
var app = express();
var path = require("path");
var ip = require("ip").address();
var port = 3001;
var mydbClass = require("./model/mydb.js");
var mydb = new mydbClass();
var bodyParser = require("body-parser");
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var utilsClass = require("./model/utils.js");
var utils = new utilsClass();
var myQRCodeClass = require("./model/myQRCode.js");
var myQRCode = new myQRCodeClass();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//route//////////////////////////////////////////////////////////////////
app.get('/serverInfo',function(req, res){
    var res_j_data={
        ip : ip,
        port : port,
    };
    res.send(JSON.stringify(res_j_data));
});

app.post('/generateQRCode', function (req, res) {
    var tableCounts;
    mydb.findAll('others',function(result){
        tableCounts = utils.getOthersValue(result,'tableCounts');
        
        for(var i=0;i<tableCounts;i++){
            let strRet = myQRCode.stringToQrcode('http://'+ip+':'+port+'/user?tablenumber='+i);
            let canvas = myQRCode.draw(strRet);
            myQRCode.ouputFile(canvas,'./view/qrcode/out_table_'+i+'.png');
        }
        res.send(JSON.stringify({success: true}));
    });
});

app.get('/default',function(req, res){
    res.sendFile(path.join(__dirname+'/view/default.html'));
});

app.get('/qrcode',function(req, res){
    res.sendFile(path.join(__dirname+'/view/qrcode.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/user',function(req, res){
    res.sendFile(path.join(__dirname+'/view/user.html'));
});

app.get('/check_user', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('/seller',function(req, res){
    res.sendFile(path.join(__dirname+'/view/seller.html'));
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
    }else if( type == "allsort" ){
        var sortTarget = req.query.sortTarget;
        var sortType = req.query.sortType;
        mydb.findAllSort(dbname,sortTarget,parseInt(sortType),function(result){
            res.send(JSON.stringify(result));
        });
    }else if( type == "allsorttoday" ){
        var sortTarget = req.query.sortTarget;
        var sortType = req.query.sortType;
        mydb.findAllSortToday(dbname,sortTarget,parseInt(sortType),function(result){
            res.send(JSON.stringify(result));
        });
    }else if( type == "allsortsomemonth" ){
        var sortTarget = req.query.sortTarget;
        var sortType = req.query.sortType;
        var month = req.query.month;
        mydb.findAllSortSomeMonth(dbname,sortTarget,parseInt(sortType),month,function(result){
            res.send(JSON.stringify(result));
        });
    }
});

app.get('/exportDb', function(req, res){
    var file = __dirname + '/back.tgz';
    res.download(file);
});

app.post('/backup', function (req, res) {
    mydb.backup(function(){
        console.log("backup finish");
        res.send(JSON.stringify({success: true}));
    });
});

app.post('/restore', function (req, res) {
    mydb.restore(function(){
        console.log("restore finish");
        res.send(JSON.stringify({success: true}));
    });
});

app.post('/restoreFromDropbox', function (req, res) {
    mydb.restoreFromDropbox(function(){
        console.log("restoreFromDropbox finish");
        res.send(JSON.stringify({success: true}));
    });
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
                maxCount:req.body.maxCount,
                time: req.body.time,
            };
            mydb.update(dbname,myquery,newvalues,function(err, obj){
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "modifyall" ){
            var myarray = req.body;
            mydb.drop(dbname,function(err, delOK){
                mydb.insertMultiple(dbname,myarray,function(){

                });
            });
        }else if( type == "insertone" ){
            var d = new Date();
            var obj={
                number:req.body.number,
                name:req.body.name,
                price:req.body.price,
                descript:req.body.descript,
                maxCount:req.body.maxCount,
                time : d.toISOString(),
                ftime:utils.formatTime(d),
                year : d.getFullYear(),
                month : d.getMonth()+1,
                date : d.getDate(),
                hour : d.getHours(),
                minute : d.getMinutes(),
            };
            mydb.insert("menu",obj,function(err,obj){
                res.send(JSON.stringify({success: true}));
            });
        }
    }else if( dbname == "others" ){
        var myarray = req.body;
        mydb.drop(dbname,function(err, delOK){
            mydb.insertMultiple(dbname,myarray,function(){
                res.send(JSON.stringify({success: true}));
            });
        });
    }else if( dbname == "userorder" ){
        if( type == "insertone" ){
            var d = new Date();
            var obj={
                tablenumber:req.body.tablenumber,
                numberOfPeople:req.body.numberOfPeople,
                order:req.body.order,
                status:req.body.status,
                time : d.toISOString(),
                ftime:utils.formatTime(d),
                year : d.getFullYear(),
                month : d.getMonth()+1,
                date : d.getDate(),
                hour : d.getHours(),
                minute : d.getMinutes()
            };
            utils.resultSum(obj);
            mydb.insert(dbname,obj,function(err,obj){
                io.emit("userorder_insertone","userorder_insertone");
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "modifyone" ){
            var myquery = {
                time: req.body.time
            };
            var newvalues = {
                tablenumber:req.body.tablenumber,
                numberOfPeople:req.body.numberOfPeople,
                order:req.body.order,
                status:req.body.status,
                time : req.body.time,
                ftime: req.body.ftime,
                year : req.body.year,
                month : req.body.month,
                date : req.body.date,
                hour : req.body.hour,
                minute : req.body.minute,
                sum : req.body.sum
            };
            mydb.update(dbname,myquery,newvalues,function(err, obj){
                io.emit("userorder_complete","userorder_complete");
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "delone" ){
            var myquery = {
                time: req.body.time
            };
            mydb.remove(dbname,myquery,function(err, obj){
                io.emit("userorder_delete","userorder_delete");
                res.send(JSON.stringify({success: true}));
            });
        }else if( type == "delall" ){
            mydb.drop(dbname,function(err, delOK){
                res.send(JSON.stringify({success: true}));
            });
        }
    }
    
});
//route//////////////////////////////////////////////////////////////////

//static/////////////////////////////////////////////////////////////////
app.use('/static', express.static(__dirname + '/static'));
//static/////////////////////////////////////////////////////////////////

//view///////////////////////////////////////////////////////////////////
app.use('/view', express.static(__dirname + '/view'));
//view///////////////////////////////////////////////////////////////////

//socket.io//////////////////////////////////////////////////////////////
io.on('connect',function(){
    console.log('connect');
});
//socket.io//////////////////////////////////////////////////////////////

server.listen(port, function () {
    console.log('Server listening on port '+port+" "+new Date());
});
