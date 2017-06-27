var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http) {
    $scope.sendOrder = function(){
        var tmporder = [];
        for(var i=0;i<$scope.menuresult.length;i++){
            try {
                if( parseInt($scope.menuresult[i].count) > 0 ){
                    var obj = {
                        name:$scope.menuresult[i].name,
                        price:$scope.menuresult[i].price,
                        count:$scope.menuresult[i].count
                    };
                    tmporder.push(obj);
                }
            } catch (error) {
                
            }
        }
        var d = new Date();
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=userorder&type=insertone',
            data: {
                tablenumber:$scope.tablenumber,
                order:tmporder,
                status:0
            }
        };
        $http(dataobj).then(function(response){
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
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
