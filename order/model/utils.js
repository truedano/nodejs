module.exports = function(){
    this.formatTime = function(d){
        return d.getMonth()+1+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+d.getMilliseconds();
    };

    this.resultSum = function(obj){
        var sum=0;
        for(var i=0;i<obj.order.length;i++){
            sum += parseInt(obj.order[i].price) * parseInt(obj.order[i].count);
        }
        obj.sum = sum;
    };
};