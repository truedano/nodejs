var getDb = function(http,dbname,type,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type
    }).then(function(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function myError(response){
        console.log('Get '+dbname+' error');
    });
};

var getDbSort = function(http,dbname,type,sortTarget,sortType,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type+"&sortTarget="+sortTarget+"&sortType="+sortType
    }).then(function(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function(response){
        console.log('Get '+dbname+' error');
    });
};

var getOthersValue = function(result,name){
    for(var i=0;i<result.length;i++){
        if( result[i].name == name ){
            return result[i].value;
        }
    }
};

var resultSum = function(result){
    for(var i=0;i<result.length;i++){
        var sum =0;
        for(var j=0;j<result[i].order.length;j++){
            sum += parseInt(result[i].order[j].price)*parseInt(result[i].order[j].count);
            result[i].sum = sum;
        }
    }
};

var formatTime = function(result){
    for(var i=0;i<result.length;i++){
        var d = new Date(result[i].time);
        result[i].formatTime = d.getMonth()+1+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
    }
}
