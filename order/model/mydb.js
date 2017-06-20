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
    }

}