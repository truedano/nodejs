var express = require("express");
var app = express();
var path = require("path");

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname+'/view/index.html'));
});

app.get("/download/:name",function(req,res){
    var downloadClass = require('./model/download.js');
    var dl = new downloadClass();
    var pathString = './download/' + req.params.name;

    dl.checkFile(pathString, function(isFile) {
        if (isFile) {
            res.download(pathString);
        } else {
            res.send('error');
        }
    });
});

app.listen(3000,function(){
    console.log("Server listen 3000 :"+new Date());
});
