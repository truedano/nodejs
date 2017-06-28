var app = angular.module('adminApp', []);

app.controller('adminCtrl', function($scope, $http) {
    $scope.saveBtn = function(){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=insertone',
            data: {
                number:$scope.menuresult.length,
                name:$scope.name,
                price:$scope.price,
                descript:$scope.descript
            }
        };
        $http(dataobj).then(function(response){
            getDb($http,"menu","all",function(result){
                $scope.menuresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function myError(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    $scope.delOneDb = function(x){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=menu&type=delone',
            data: x
        };
        $http(dataobj).then(function (response){
            getDb($http,"menu","all",function(result){
                $scope.menuresult = result;
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
                $scope.menuresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function(response){
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
                $scope.menuresult = result;
                console.log(dataobj.method,dataobj.url,"success");
            });
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    }

    $scope.saveOthers = function(){
        var dataobj = {
            method: 'POST',
            url: '/mydb?dbname=others',
            data: [
                {name:'tableCounts',value:$scope.tableCounts},
                {name:'businessStartHour',value:$scope.businessStartHour},
                {name:'businessStartMinute',value:$scope.businessStartMinute},
                {name:'businessEndHour',value:$scope.businessEndHour},
                {name:'businessEndMinute',value:$scope.businessEndMinute}
            ]
        };
        $http(dataobj).then(function(response){
            console.log(dataobj.method,dataobj.url,"success");
        },function(response){
            console.log(dataobj.method,dataobj.url,"error");
        });
    };

    //up button//
    $scope.reduceNumber = function(number){
        console.log("reduceNumber :"+number);
        if( number == 0 ){
            console.log("Do not move");
        }else{
            var tmpobj = $scope.menuresult[number-1];
            $scope.menuresult[number-1] = $scope.menuresult[number];
            $scope.menuresult[number] = tmpobj;
            $scope.menuresult[number-1].number = number-1;
            $scope.menuresult[number].number = number;
            var dataobj = {
                method: 'POST',
                url: '/mydb?dbname=menu&type=modifyall',
                data: $scope.menuresult
            };
            $http(dataobj).then(function(response){
                getDb($http,"menu","all",function(result){
                    $scope.menuresult = result;
                    console.log(dataobj.method,dataobj.url,"success");
                });
            },function(response){
                console.log(dataobj.method,dataobj.url,"error");
            });
        }
    };

    //dwon button//
    $scope.addNumber = function(number){
        console.log("addNumber :"+number);
        if( number == ($scope.menuresult.length-1) ){
            console.log("Do not move");
        }else{
            var tmpobj = $scope.menuresult[number+1];
            $scope.menuresult[number+1] = $scope.menuresult[number];
            $scope.menuresult[number] = tmpobj;
            $scope.menuresult[number+1].number = number+1;
            $scope.menuresult[number].number = number;
            var dataobj = {
                method: 'POST',
                url: '/mydb?dbname=menu&type=modifyall',
                data: $scope.menuresult
            };
            $http(dataobj).then(function(response){
                getDb($http,"menu","all",function(result){
                    $scope.menuresult = result;
                    console.log(dataobj.method,dataobj.url,"success");
                });
            },function(response){
                console.log(dataobj.method,dataobj.url,"error");
            });
        }
    };

    getDb($http,"menu","all",function(result){
        $scope.menuresult = result;
    });

    getDb($http,"others","all",function(result){
        $scope.tableCounts = getOthersValue(result,'tableCounts');
        $scope.businessStartHour = getOthersValue(result,'businessStartHour');
        $scope.businessStartMinute = getOthersValue(result,'businessStartMinute');
        $scope.businessEndHour = getOthersValue(result,'businessEndHour');
        $scope.businessEndMinute = getOthersValue(result,'businessEndMinute');
    });

});
