var getDb = function(http,dbname,type,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type
    }).then(function mySuccess(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function myError(response){
        console.log('Get '+dbname+' error');
    });
};

var getOthersValue = function(result,name){
    for(var i=0;i<result.length;i++){
        if( result[i].name == name ){
            return result[i].value;
        }
    }
}
