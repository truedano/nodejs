var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http) {
    getDb($http,"menu","all",function(result){
        $scope.dbresult = result;
    });

    $scope.sendOrder = function(x){
        console.log($scope.dbresult);
    };
});
