
var Mychart = function(dataText,titleText,xdata,ydata){
    this.color = Chart.helpers.color;
    this.barChartData = {
        labels: xdata,
        datasets: [{
            label: dataText,
            backgroundColor: this.color("#0000FF").alpha(0.5).rgbString(),
            borderColor: "#0000FF",
            borderWidth: 1,
            data: ydata
        }]
    };
    this.infoData = {
        type: 'bar',
        data: this.barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: titleText
            }
        }
    };

    this.getChart = function(id){
        var ctx = document.getElementById(id).getContext("2d");
        new Chart(ctx,this.infoData);
    };
};

var getDailyData = function(result){
    var d = new Date();
    var chartdata = {xdata:[],ydata:[]};
    var now_month_date = new Date(d.getFullYear(),d.getMonth()+1,0).getDate();
    
    for(var i=0;i<now_month_date;i++){
        chartdata.xdata.push(i+1);
        var sum = 0;
        for(j=0;j<result.length;j++){
            if( result[j].month == d.getMonth()+1 && result[j].date == i+1 && result[j].status == 1 ){
                sum += result[j].sum;
            }
        }
        chartdata.ydata.push(sum);
    }
    return chartdata;
};

var getMonthData = function(result){
    var d = new Date();
    var chartdata = {xdata:[],ydata:[]};

    for(var i=0;i<12;i++){
        chartdata.xdata.push(i+1);
        var sum = 0;
        for(j=0;j<result.length;j++){
            if( result[j].year == d.getFullYear() && result[j].month == i+1 && result[j].status == 1 ){
                sum += result[j].sum;
            }
        }
        chartdata.ydata.push(sum);
    }
    return chartdata;
};
