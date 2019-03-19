var app = angular.module('sellerApp', []);

app.controller('sellerCtrl', function($scope, $http, $location) {
    var sortType = -1;
    var port = location.port;

    $scope.completeOrder = function(x){
        (x.status == 0)?x.status = 1:x.status = 0;
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

    $scope.clickSort = function(sortTarget){
        sortType == -1?sortType = 1:sortType = -1;
        getDbSort($http,"userorder","allsorttoday",sortTarget,sortType,getDbCallback);
    };

    var getDbCallback = function(result){
        $scope.userorderresult = result;
    };

    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);

    var socket = io.connect('http://'+$location.host()+':'+port);
    socket.on('connect', function(data) {

    });
    socket.on('userorder_insertone',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
