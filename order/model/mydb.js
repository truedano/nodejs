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
}