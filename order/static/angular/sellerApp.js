var app = angular.module('sellerApp', []);

app.controller('sellerCtrl', function($scope, $http, $location) {
    var sortType = -1;

    $scope.completeOrder = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=userorder&type=modifyone',
            data: x
        };
        $http(dataobj).then(function(response){
            getDbSort($http,"userorder","allsort","time",sortType,function(result){
                $scope.userorderresult = result;
                resultSum($scope.userorderresult);
            });
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.deleteOrder = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=userorder&type=delone',
            data: x
        };
        $http(dataobj).then(function(response){
            getDbSort($http,"userorder","allsort","time",sortType,function(result){
                $scope.userorderresult = result;
                resultSum($scope.userorderresult);
            });
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.clickSort = function(sortTarget){
        sortType == -1?sortType = 1:sortType = -1;
        getDbSort($http,"userorder","allsort",sortTarget,sortType,function(result){
            $scope.userorderresult = result;
            resultSum($scope.userorderresult);
        });
    };

    getDbSort($http,"userorder","allsort","time",sortType,function(result){
        $scope.userorderresult = result;
        resultSum($scope.userorderresult);
    });

    var socket = io.connect('http://'+$location.host()+':3000');
    socket.on('connect', function(data) {

    });
    socket.on('userorder_insertone',function(){
        getDbSort($http,"userorder","allsort","time",sortType,function(result){
            $scope.userorderresult = result;
            resultSum($scope.userorderresult);
        });
    });
});
