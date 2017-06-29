
var Mychart = function(titleText,chardata){
    this.options = {
        animationEnabled: true,
        theme: "theme2",
        //exportEnabled: true,
        title:{
            text: titleText
        },
        data: [
            {
                type: "column", //change type to bar, line, area, pie, etc
                dataPoints: chardata
            }
        ]
    };

    this.getChart = function(id){
        new CanvasJS.Chart(id,this.options).render();
    };
};

var getDailyData = function(result){
    var d = new Date();
    var chardata = [];
    var now_month_date = new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
    
    for(var i=0;i<now_month_date;i++){
        var obj={x:0,y:0};
        obj.x = i+1;
        for(j=0;j<result.length;j++){
            if( result[j].date == i+1 && result[j].status == 1 ){
                obj.y += result[j].sum;
            }
        }
        chardata.push(obj);
    }
    return chardata;
};

var getMonthData = function(result){
    var chardata = [];

    for(var i=0;i<12;i++){
        var obj={x:0,y:0};
        obj.x = i+1;
        for(j=0;j<result.length;j++){
            if( result[j].month == i+1 && result[j].status == 1 ){
                obj.y += result[j].sum;
            }
        }
        chardata.push(obj);
    }
    return chardata;
};
