var app = angular.module('adminApp', []);

app.controller('adminCtrl', function($scope, $http) {
    $scope.saveBtn = function(){
        setDb($http,"menu","insertone",
            {
                number:$scope.menuresult.length,
                name:$scope.name,
                price:$scope.price,
                descript:$scope.descript
            },
            function(){
                getDbSort($http,"menu","all","number",1,function(result){
                    $scope.menuresult = result;
                });
            }
        );
    };

    $scope.delOneDb = function(x){
        setDb($http,"menu","delone",x,function(){
                getDbSort($http,"menu","all","number",1,function(result){
                    $scope.menuresult = result;
                    
                });
            }
        );
    };

    $scope.delAllDb = function(){
        setDb($http,"menu","delall",null,function(){
                getDbSort($http,"menu","all","number",1,function(result){
                    $scope.menuresult = result; 
                });
            }
        );
    };

    $scope.modifyOneDb = function(x){
        setDb($http,"menu","modifyone",x,function(){
                getDbSort($http,"menu","all","number",1,function(result){
                    $scope.menuresult = result;
                });
            }
        );
    }

    $scope.saveOthers = function(){
        setDb($http,"others",null,
            [
                {name:'tableCounts',value:$scope.tableCounts},
                {name:'businessStartHour',value:$scope.businessStartHour},
                {name:'businessStartMinute',value:$scope.businessStartMinute},
                {name:'businessEndHour',value:$scope.businessEndHour},
                {name:'businessEndMinute',value:$scope.businessEndMinute},
                {name:'backupTime',value:$scope.backupTime},
            ],
            function(){}
        );
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

            setDb($http,"menu","modifyall",$scope.menuresult,function(){
                    getDbSort($http,"menu","all","number",1,function(result){
                        $scope.menuresult = result;
                    });
                }
            );
        }
    };

    //down button//
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

            setDb($http,"menu","modifyall",$scope.menuresult,function(){
                    getDbSort($http,"menu","all","number",1,function(result){
                        $scope.menuresult = result;
                    });
                }
            );
        }
    };

    $scope.backupDb = function(){
        setDb($http,"others",null,
            [
                {name:'tableCounts',value:$scope.tableCounts},
                {name:'businessStartHour',value:$scope.businessStartHour},
                {name:'businessStartMinute',value:$scope.businessStartMinute},
                {name:'businessEndHour',value:$scope.businessEndHour},
                {name:'businessEndMinute',value:$scope.businessEndMinute},
                {name:'backupTime',value:new Date().toString()}
            ],
            function(){
                $http({
                    method: 'POST',
                    url: '/backup'
                }).then(function(response){
                    console.log("get /backup success");
                    getDb($http,"others","all",function(result){
                        $scope.tableCounts = getOthersValue(result,'tableCounts');
                        $scope.businessStartHour = getOthersValue(result,'businessStartHour');
                        $scope.businessStartMinute = getOthersValue(result,'businessStartMinute');
                        $scope.businessEndHour = getOthersValue(result,'businessEndHour');
                        $scope.businessEndMinute = getOthersValue(result,'businessEndMinute');
                        $scope.backupTime = getOthersValue(result,'backupTime');
                    });
                },function(response){
                    console.log("get /backup error");
                });
            }
        );
    };

    $scope.restoreDb = function(){
        $http({
            method: 'POST',
            url: '/restore'
        }).then(function(response){
            console.log("get /restore success");
            location.reload();
        },function(response){
            console.log("get /restore error");
        });
    };

    getDbSort($http,"menu","all","number",1,function(result){
        $scope.menuresult = result;
    });

    getDb($http,"others","all",function(result){
        $scope.tableCounts = getOthersValue(result,'tableCounts');
        $scope.businessStartHour = getOthersValue(result,'businessStartHour');
        $scope.businessStartMinute = getOthersValue(result,'businessStartMinute');
        $scope.businessEndHour = getOthersValue(result,'businessEndHour');
        $scope.businessEndMinute = getOthersValue(result,'businessEndMinute');
        $scope.backupTime = getOthersValue(result,'backupTime');
    });

    getDbSort($http,"userorder","allsort","time",1,function(result){
        var dailyData = getDailyData(result);
        var dailyChart = new Mychart("Daily("+(new Date().getMonth()+1)+")","Daily income",dailyData.xdata,dailyData.ydata);
        dailyChart.getChart("dailyChart");

        var monthData = getMonthData(result);
        var monthChart = new Mychart("Month("+new Date().getFullYear()+")","Month income",monthData.xdata,monthData.ydata);
        monthChart.getChart("monthChart");

    });

});
