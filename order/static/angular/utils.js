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