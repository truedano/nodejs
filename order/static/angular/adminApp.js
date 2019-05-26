var app = angular.module('adminApp', []);

app.controller('adminCtrl', function($scope, $http, $window) {
    var sortType = -1;
    
    $scope.saveBtn = function(){
        setDb($http,"menu","insertone",
            {
                number:$scope.menuresult.length,
                name:$scope.name,
                price:$scope.price,
                descript:$scope.descript,
                maxCount:$scope.maxCount,
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

    var setDbOthers = function(callback){
        setDb($http,"others",null,
            [
                {name:'tableCounts',value:$scope.tableCounts},
                {name:'numberOfPeople',value:$scope.numberOfPeople},
                {name:'businessStartHour',value:$scope.businessStartHour},
                {name:'businessStartMinute',value:$scope.businessStartMinute},
                {name:'businessEndHour',value:$scope.businessEndHour},
                {name:'businessEndMinute',value:$scope.businessEndMinute},
                {name:'backupTime',value:$scope.backupTime},
                {name:'dropboxAccessToken',value:$scope.dropboxAccessToken},
                {name:'multiLanguage',value:$scope.multiLanguage},
            ],
            callback
        );
    };

    $scope.saveOthers = function(){
        setDbOthers(function(){
            console.log('setDbOthers')
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

    var initOthers = function(result){
        $scope.tableCounts = getOthersValue(result,'tableCounts');
        $scope.numberOfPeople = getOthersValue(result,'numberOfPeople');
        $scope.businessStartHour = getOthersValue(result,'businessStartHour');
        $scope.businessStartMinute = getOthersValue(result,'businessStartMinute');
        $scope.businessEndHour = getOthersValue(result,'businessEndHour');
        $scope.businessEndMinute = getOthersValue(result,'businessEndMinute');
        $scope.backupTime = getOthersValue(result,'backupTime');
        $scope.dropboxAccessToken = getOthersValue(result,'dropboxAccessToken');
        $scope.multiLanguage = getOthersValue(result,'multiLanguage');
        if($scope.multiLanguage == undefined || $scope.multiLanguage == NaN || $scope.multiLanguage ==''){
            $scope.multiLanguage = 0;
        }
        //Multi language
        $scope.ml = getMultiLanguage(getOthersValue(result,'multiLanguage'));
    };

    var initDate = function(){
        $scope.month = "all";
        $scope.monthCount = ["all",1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    };

    $scope.choice_month = function(x){
        $scope.month = x;
        if( x == "all" ){
            getDbSort($http,"userorder","allsort","time",sortType,getUserorderCallback);
        }else{
            getDbSortSomeMonth($http,"userorder","allsortsomemonth","time",1,$scope.month,getUserorderCallback);
        }
    };

    $scope.backupDb = function(){
        setDbOthers(function(){
            $http({
                method: 'POST',
                url: '/backup'
            }).then(function(response){
                console.log("get /backup success");
                getDb($http,"others","all",function(result){
                    initOthers(result);
                });
            },function(response){
                console.log("get /backup error");
            });
        });
    };

    $scope.exportDb = function(){
        $window.open("/exportDb", "_blank")
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

    $scope.restoreFromDropbox = function(){
        $http({
            method: 'POST',
            url: '/restoreFromDropbox'
        }).then(function(response){
            console.log("get /restoreFromDropbox success");
            location.reload();
        },function(response){
            console.log("get /restoreFromDropbox error");
        });
    };

    $scope.generateQRCode = function(){
        $http({
            method: 'POST',
            url: '/generateQRCode'
        }).then(function(response){
            console.log("post /generateQRCode success");
            location.reload();
        },function(response){
            console.log("post /generateQRCode error");
        });
    };

    $scope.showQRCode = function(){
        $window.open("/qrcode", "_blank")
    };

    getDbSort($http,"menu","all","number",1,function(result){
        $scope.menuresult = result;
        console.log($scope.menuresult);
    });

    getDb($http,"others","all",function(result){
        initOthers(result);
        getDbSort($http,"userorder","allsort","time",1,function(result){
            var dailyData = getDailyData(result);
            var dailyChart = new Mychart("Daily("+(new Date().getMonth()+1)+")","Daily income",dailyData.xdata,dailyData.ydata);
            dailyChart.getChart("dailyChart");
    
            var monthData = getMonthData(result);
            var monthChart = new Mychart("Month("+new Date().getFullYear()+")","Month income",monthData.xdata,monthData.ydata);
            monthChart.getChart("monthChart");
        });
        initDate();
    });

    var getUserorderCallback = function(result){
        $scope.userorderresult = result;
    };

    //list part
    getDbSort($http,"userorder","allsort","time",sortType,getUserorderCallback);

    $scope.clickSort = function(sortTarget){
        sortType == -1?sortType = 1:sortType = -1;
        if( $scope.month == "all" ){
            getDbSort($http,"userorder","allsort","time",sortType,getUserorderCallback);
        }else{
            getDbSortSomeMonth($http,"userorder","allsortsomemonth","time",sortType,$scope.month,getUserorderCallback);
        }
    };
});
