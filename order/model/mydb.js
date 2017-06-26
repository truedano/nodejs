var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

module.exports = function(){

    this.findAll = function(tableName,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find({}).toArray(function(err, result) {
                callback(result);
                db.close();
            });
        });
    };

    this.findOne = function(tableName,callback){
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).findOne({},function(err, result) {
                callback(err,result);
                db.close();
            });
        });
    };

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
            day: new Date().getDay()
        };
        MongoClient.connect(url,function(err,db){
            db.collection(tableName).find(myquery).sort([[sortTarget, sortType]]).toArray(function(err, result) {
                callback(result);
                db.close();
            });
        });
    };
}