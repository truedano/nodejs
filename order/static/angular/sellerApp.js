var app = angular.module('sellerApp', []);

app.controller('sellerCtrl', function($scope, $http, $location) {
    var sortType = -1;
    var port = location.port;

    $scope.completeOrder = function(x){
        (x.status == 0)?x.status = 1:x.status = 0;
        for(var i=0;i<x.order.length;i++){
            if(x.status == 1)
                x.order[i].status = 1;
            else
                x.order[i].status = 0;
        }
        setDb($http,"userorder","modifyone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    $scope.deleteOrder = function(x){
        setDb($http,"userorder","delone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    $scope.completeOrderDetal = function(x,y){
        (y.status == 0)?y.status = 1:y.status = 0;

        //check all list status
        status_sum = 0;
        for(var i=0;i<x.order.length;i++){
            status_sum += parseInt(x.order[i].status);
        }
        if(status_sum == x.order.length){
            x.status = 1;
        }else{
            x.status = 0;
        }

        setDb($http,"userorder","modifyone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    $scope.clickSort = function(sortTarget){
        sortType == -1?sortType = 1:sortType = -1;
        getDbSort($http,"userorder","allsorttoday",sortTarget,sortType,getDbCallback);
    };

    var getDbCallback = function(result){
        $scope.userorderresult = result;
    };

    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);

    getDb($http,"others","all",function(result){
        $scope.ml = getMultiLanguage(getOthersValue(result,'multiLanguage'));
    });

    var socket = io.connect('http://'+$location.host()+':'+port);
    socket.on('connect', function(data) {

    });
    socket.on('userorder_insertone',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
