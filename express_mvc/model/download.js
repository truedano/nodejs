module.exports = function(){
    this.checkFile = function(pathString, callback){
        var fs = require('fs');
        fs.stat(pathString,function(err, stats){
            if(!err){
                callback(true);
            }else{
                callback(false);
            }
        });
    }
}