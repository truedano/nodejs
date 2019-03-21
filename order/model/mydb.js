var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var exec = require("child_process").exec;

//dropbox
var fetch = require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
var dropboxAccessToken;
var fs = require('fs');

module.exports = function(){
    var findAll = function(tableName,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find({}).toArray(function(err, result) {
                callback(result);
                db.close();
            });
        });
    };
    var getOthersValue = function(result,name){
        for(var i=0;i<result.length;i++){
            if( result[i].name == name ){
                return result[i].value;
            }
        }
    };

    this.findAll = findAll;

    this.findOne = function(tableName,myquery,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find(myquery).toArray(function(err, result) {
                callback(err, result);
                db.close();
            });
        });
    };

    this.insert = function(tableName,obj,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).insertOne(obj,function(err,obj){
                callback(err,obj);
                db.close();
            });
        });
    };

    this.insertMultiple = function(tableName,myarray,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).insertMany(myarray,function(err,result){
                callback(err,result);
                db.close();
            });
        });
    };

    this.drop = function(tableName,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).drop(function(err, delOK){
                callback(err, delOK);
                db.close();
            });
        });
    };

    this.remove = function(tableName,myquery,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).remove(myquery,function(err, obj){
                callback(err, obj);
                db.close();
            });
        });
    };

    this.update = function(tableName,myquery,newvalues,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).update(myquery,newvalues,function(err, obj){
                callback(err, obj);
                db.close();
            });
        });
    };

    this.findAllSort = function(tableName,sortTarget,sortType,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find({}).sort([[sortTarget, sortType]]).toArray(function(err, result) {
                callback(result);
                db.close();
            });
        });
    };

    this.findAllSortToday = function(tableName,sortTarget,sortType,callback){
        var myquery = {
            month: new Date().getMonth()+1,
            date: new Date().getDate()
        };
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find(myquery).sort([[sortTarget, sortType]]).toArray(function(err, result) {
                callback(result);
                db.close();
            });
        });
    };

    this.backup = function(callback){
        exec(
            'mongoexport --db mydb --collection menu --out ./back/menu.json;'+
            'mongoexport --db mydb --collection others --out ./back/others.json;'+
            'mongoexport --db mydb --collection userorder --out ./back/userorder.json;'+
            'tar czvf back.tgz back;'
            ,function (error, stdout, stderr) {
                callback();
                findAll('others',function(result){
                    dropboxAccessToken = getOthersValue(result,'dropboxAccessToken');
                    //console.log("dropboxAccessToken="+dropboxAccessToken);
                    var dbx = new Dropbox({ accessToken: dropboxAccessToken, fetch: fetch });
                    
                    fs.readFile('back.tgz', function (err, contents) {
                        if (err) {
                            //console.log('Error: ', err);
                        }
                        dbx.filesUpload({ path: '/back.tgz', contents: contents })
                        .then(function (response) {
                            //console.log(response);
                        })
                        .catch(function (err) {
                            //console.log(err);
                        });
                    });
                });
            }
        );
    };

    this.restore = function(callback){
        exec(
            'echo "db.menu.remove()" | mongo mydb;'+
            'mongoimport --db mydb --collection menu --file ./back/menu.json;'+
            'echo "db.others.remove()" | mongo mydb;'+
            'mongoimport --db mydb --collection others --file ./back/others.json;'+
            'echo "db.userorder.remove()" | mongo mydb;'+
            'mongoimport --db mydb --collection userorder --file ./back/userorder.json;'
            , function (error, stdout, stderr) {
                callback();
            }
        );
    };
}