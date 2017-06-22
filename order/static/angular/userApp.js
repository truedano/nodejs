var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http) {
    $scope.sendOrder = function(){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=userorder&type=insertone',
            data: {
                tablenumber:$scope.tablenumber,
                order:$scope.menuresult,
                status:0,
                time: new Date()
            }
        };
        $http(dataobj).then(function(response){
            console.log(dataobj.method,dataobj.url,"success");
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
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

});
