var app = angular.module('qrcodeApp', []);

app.controller('qrcodeCtrl', function($scope, $http, $window) {

    var initQrcode = function(result){
        $scope.tableCounts = getOthersValue(result,'tableCounts');
        $scope.multiLanguage = getOthersValue(result,'multiLanguage');
        if($scope.multiLanguage == undefined || $scope.multiLanguage == NaN || $scope.multiLanguage ==''){
            $scope.multiLanguage = 0;
        }
        //Multi language
        $scope.ml = getMultiLanguage(getOthersValue(result,'multiLanguage'));

        for(var i=0;i<$scope.tableCounts;i++){
            $('.qrcode_show').append('<tr><td>'+parseInt(i+1)+'</td><td><img src="view/qrcode/out_table_'+i+'.png"></td></tr>');
        }
    };

    getDb($http,"others","all",function(result){
        initQrcode(result);
    });
});
