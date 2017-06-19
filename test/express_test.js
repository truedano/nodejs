var express = require("express");
var app = express();
var port = 3000;

var url  = require('url');
var fs   = require("fs");
var path    = require("path");
var bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.listen(port,function(){
    console.log("listen port :"+port);
});

app.get("/Signup",function(req,res){
    var urlData;
    
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    urlData = url.parse(req.url,true);
    user = urlData.query;
    res.end("<h1>" + user.username + "歡迎您的加入</h1><p>我們已經將會員啟用信寄至" + user.email + "</p>");
});

app.get("/get",function(req,res){
    res.sendFile(path.join(__dirname+'/view/express_get_example_form.html'));
});

app.post("/Signup",function(req,res){
    var username = req.param('username', null);
    var email = req.param('email', null);
    
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.end("<h1>" + username + "歡迎您的加入</h1><p>我們已經將會員啟用信寄至" + email + "</p>");
});

app.get("/post",function(req,res){
    res.sendFile(path.join(__dirname+'/view/express_post_example_form.html'));
});
