var app = angular.module('adminApp', []);

app.controller('adminCtrl', function($scope, $http) {
    $scope.saveBtn = function(){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=insertone',
            data: {
                number:$scope.number,
                name:$scope.name,
                price:$scope.price,
                descript:$scope.descript,
                time: new Date()
            }
        };
        $http(dataobj).then(function(response){
            getDb($http,"menu","all",function(result){
                $scope.dbresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    getDb($http,"menu","all",function(result){
        $scope.dbresult = result;
    });

    $scope.delOneDb = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=delone',
            data: x
        };
        $http(dataobj).then(function (response){
            getDb($http,"menu","all",function(result){
                $scope.dbresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.delAllDb = function(){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=delall'
        };
        $http(dataobj).then(function(response){
            getDb($http,"menu","all",function(result){
                $scope.dbresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.modifyOneDb = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=modifyone',
            data: x
        };
        $http(dataobj).then(function(response){
            getDb($http,"menu","all",function(result){
                $scope.dbresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    }

    $scope.saveTableCounts = function(name,value){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=others&type=add',
            data: {
                name:name,
                value:value
            }
        };
        $http(dataobj).then(function mySuccess(response){
            console.log(dataobj.method,dataobj.url,"success");
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };
});
