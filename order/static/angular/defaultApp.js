var app = angular.module('defaultApp', []);

app.controller('defaultCtrl', function($scope, $http, $window) {
    var sortType = -1;

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
        $scope.ml = getMultiLanguage(0);
    };

    getDb($http,"others","all",function(result){
        initOthers(result);
    });
});
