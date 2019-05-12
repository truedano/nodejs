var app = angular.module('sellerApp', []);

app.controller('sellerCtrl', function($scope, $http, $location) {
    var sortType = -1;
    var port = location.port;

    $scope.confirmOrder = function(x){
        x.status = $scope.ml.confirm;
        setDb($http,"userorder","modifyone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    $scope.completeOrder = function(x){
        if( x.status == $scope.ml.notReady || x.status == $scope.ml.confirm ){
            x.status = $scope.ml.complete;
        }else{
            x.status = $scope.ml.notReady;
        }
        for(var i=0;i<x.order.length;i++){
            if(x.status == $scope.ml.complete)
                x.order[i].status = $scope.ml.complete;
            else
                x.order[i].status = $scope.ml.notReady;
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
        //(y.status == 0)?y.status = 1:y.status = 0;
        if( y.status == $scope.ml.notReady ){
            y.status = $scope.ml.complete;
        }else{
            y.status = $scope.ml.notReady;
        }

        //check all list status
        status_sum = 0;
        for(var i=0;i<x.order.length;i++){
            if( x.order[i].status == $scope.ml.complete ){
                status_sum++;
            }
        }
        if(status_sum == x.order.length){
            x.status = $scope.ml.complete;
        }else{
            if( x.status != $scope.ml.confirm )
                x.status = $scope.ml.notReady;
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
    socket.on('userorder_complete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
    socket.on('userorder_insertone',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
    socket.on('userorder_delete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
