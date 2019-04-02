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
            'mongodump -h 127.0.0.1 -d mydb -o ./back;'+
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

    var restoreExec = function(callback){
        exec(
            'mongo mydb --eval "db.others.drop()";'+
            'mongo mydb --eval "db.menu.drop()";'+
            'mongo mydb --eval "db.userorder.drop()";'+
            'mongorestore -h 127.0.0.1 -d mydb ./back/mydb/;'
            , function (error, stdout, stderr) {
                callback();
            }
        );
    };

    this.restore = function(callback){
        restoreExec(callback);
    };

    this.restoreFromDropbox = function(callback){
        findAll('others',function(result){
            dropboxAccessToken = getOthersValue(result,'dropboxAccessToken');
            var dbx = new Dropbox({ accessToken: dropboxAccessToken, fetch: fetch });

            dbx.filesDownload({ path: '/back.tgz' })
            .then(function (response) {
                console.log("filesDownload ok");
                restoreExec(callback);
            })
            .catch(function (err) {
                console.log("filesDownload err");
            });
        });
    };
}