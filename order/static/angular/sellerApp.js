var app = angular.module('sellerApp', []);

app.controller('sellerCtrl', function($scope, $http) {

    $scope.completeOrder = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=userorder&type=modifyone',
            data: x
        };
        $http(dataobj).then(function(response){
            getDb($http,"userorder","allsort","time","-1",function(result){
                $scope.userorderresult = result;
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
            getDb($http,"userorder","allsort","time","-1",function(result){
                $scope.userorderresult = result;
            });
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    getDb($http,"userorder","allsort","time","-1",function(result){
        $scope.userorderresult = result;
    });

});
