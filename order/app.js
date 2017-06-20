var express = require('express');
var app = express();
var path = require("path");
var port = 3000;
var mydbClass = require("./model/mydb.js");
var mydb = new mydbClass();

//route//////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get('/check_user', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('/check_seller', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('/check_admin', function (req, res) {
    res.send(JSON.stringify({success: true}));
});

app.get('*', function(req, res){
    res.send('Page not found!', 404);
});
//route//////////////////////////////////////////////////////////////////

//static/////////////////////////////////////////////////////////////////
app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server listening on port '+port+" "+new Date());

    mydb.findAll("test",function(result){
        console.log(result);
    });

});