var app = angular.module('adminApp', []);

app.controller('adminCtrl', function($scope, $http) {
    $scope.saveBtn = function(){
        $http({
            method: 'POST',
            url: '/admin',
            data: {
                number:$scope.number,
                name:$scope.name,
                price:$scope.price,
                descript:$scope.descript,
                time: new Date()
            }
        }).then(function mySuccess(response){
            console.log("success");
            getDb("menu","all");
        },function myError(response){
            console.log("error");
        });
    };

    var getDb = function(dbname,type){
        $http({
            method: 'GET',
            url: '/mydb?dbname='+dbname+'&type='+type
        }).then(function mySuccess(response){
            console.log('Get '+dbname+' success');
            $scope.dbresult = response.data;
        },function myError(response){
            console.log('Get '+dbname+' error');
        });
    };
    getDb("menu","all");

    $scope.delOneDb = function(x){
        $http({
            method: 'POST',
            url: '/mydb?dbname=menu&type=delone',
            data: x
        }).then(function mySuccess(response){
            console.log("Post db success");
            getDb("menu","all");
        },function myError(response){
            console.log("Post db error");
        });
    };

    $scope.delAllDb = function(){
        $http({
            method: 'POST',
            url: '/mydb?dbname=menu&type=delall'
        }).then(function mySuccess(response){
            console.log("Post db success");
            getDb("menu","all");
        },function myError(response){
            console.log("Post db error");
        });
    };

    $scope.modifyOneDb = function(x){
        console.log("modifyOneDb");
        $http({
            method: 'POST',
            url: '/mydb?dbname=menu&type=modifyone',
            data: x
        }).then(function mySuccess(response){
            console.log("Post db success");
            getDb("menu","all");
        },function myError(response){
            console.log("Post db error");
        });
    }
});
