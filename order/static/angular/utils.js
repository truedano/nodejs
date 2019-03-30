var getDb = function(http,dbname,type,callback){
    http({
        method: 'GET',
        url: '/mydb?dbname='+dbname+'&type='+type
    }).then(function(response){
        console.log('Get '+dbname+' success');
        callback(response.data);
    },function(response){
        console.log('Get '+dbname+' error');
    });
};

var setDb = function(http,dbname,type,postdata,callback){
    var dataobj = {
        method: 'POST',
        url: '/mydb?dbname='+dbname+'&type='+type,
        data: postdata
    };
    http(dataobj).then(function(response){
        console.log(dataobj.method,dataobj.url,"success");
        callback(response);
    },function(response){
        console.log(dataobj.method,dataobj.url,"error");
    });
}

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

var formatTime = function(d){
    return d.getMonth()+1+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
};

var getPathParm = function(item){
    var url = location.href;
    var ret = "";

    if(url.indexOf('?')!=-1)
    {
        var ary = url.split('?')[1].split('&');

        for(i=0;i<=ary.length-1;i++)
        {
            if(ary[i].split('=')[0] == item)
                ret = ary[i].split('=')[1];
        }
    }
    return ret;
};

var getMultiLanguage = function(langId){
    var lang = [
        {
            user : "User",
        },
        {
            user : "使用者",
        }
    ];

    return lang[langId];
};
