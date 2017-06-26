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
            getDbSortToday($http,"userorder","allsorttoday","time",sortType,getDbCallback);
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
            getDbSortToday($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.clickSort = function(sortTarget){
        sortType == -1?sortType = 1:sortType = -1;
        getDbSortToday($http,"userorder","allsorttoday",sortTarget,sortType,getDbCallback);
    };

    var getDbCallback = function(result){
        $scope.userorderresult = result;
        resultSum($scope.userorderresult);
    };

    getDbSortToday($http,"userorder","allsorttoday","time",sortType,getDbCallback);

    var socket = io.connect('http://'+$location.host()+':3000');
    socket.on('connect', function(data) {

    });
    socket.on('userorder_insertone',function(){
        getDbSortToday($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
