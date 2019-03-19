var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http, $location) {
    var sortType = -1;
    var port = location.port;

    $scope.sendOrder = function(){
        if( typeof $scope.tablenumber == 'undefined' ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Please choice table number</div>',
                size : 'small'
            });
            return;
        }
            
        var cnterr=0;
        for(var i=0;i<$scope.menuresult.length;i++){
            if( typeof $scope.menuresult[i].count == 'undefined' || $scope.menuresult[i].count == null ){
                cnterr++;
            }
        }
        if( cnterr == $scope.menuresult.length ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Please choice menu</div>',
                size : 'small'
            });
            return;
        }

        var tmporder = [];
        var tmpmessage = '';
        var sum = 0;
        tmpmessage += "table number : "+$scope.tablenumber+"<br>";
        for(var i=0;i<$scope.menuresult.length;i++){
            try {
                if( parseInt($scope.menuresult[i].count) > 0 ){
                    var obj = {
                        name:$scope.menuresult[i].name,
                        price:$scope.menuresult[i].price,
                        count:$scope.menuresult[i].count
                    };
                    tmporder.push(obj);
                    tmpmessage += obj.name + " " + obj.price + " X " + obj.count+"<br>";
                    sum += parseInt(obj.price)*parseInt(obj.count);
                }
            } catch (error) {
                
            }
        }
        tmpmessage += "sum : "+sum;
        bootbox.confirm({
            title: "Re-determined",
            message: tmpmessage,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if( result ){
                    setDb($http,"userorder","insertone",
                        {
                            tablenumber:$scope.tablenumber,
                            order:tmporder,
                            status:0
                        },
                        function(){
                            getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
                        }
                    );
                }
            }
        });
    };

    $scope.addCount = function(x){
        if( typeof x.count == 'undefined' ){
            x.count=1;
        }else{
            x.count++;
        }
    };

    $scope.reduceCount = function(x){
        if( typeof x.count == 'undefined' || x.count == 1 ){
            x.count=1;
        }else{
            x.count--;
        }
    };

    getDb($http,"menu","all",function(result){
        $scope.menuresult = result;
    });

    getDb($http,"others","all",function(result){
        $scope.tableCountsShow = [];
        var tableCounts = getOthersValue(result,'tableCounts');
        for(var i=0;i<tableCounts;i++){
            $scope.tableCountsShow.push(i+1);
        }
    });

    var getDbCallback = function(result){
        $scope.userorderresult = result;
    };

    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);

    var socket = io.connect('http://'+$location.host()+':'+port);
    socket.on('connect', function(data) {

    });
    socket.on('userorder_complete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
    socket.on('userorder_delete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
