var app = angular.module('userApp', []);

app.controller('userCtrl', function($scope, $http, $location) {
    var sortType = -1;
    var port = location.port;
    var path_tablenumber = getPathParm('tablenumber');

    if( path_tablenumber != '' ){
        $scope.tablenumber = path_tablenumber;
        $scope.selectTablenumberFlag = 0;
    }else{
        $scope.tablenumber = undefined;
    }
    
    $scope.selectTablenumber = function(){
        if( path_tablenumber != '' ){
            //console.log("selectTablenumberFlag=0");
            $scope.selectTablenumberFlag = 0;
        }else{
            //console.log("selectTablenumberFlag=1");
            $scope.selectTablenumberFlag = 1;
        }

        if( $scope.tablenumber == 'Tackout' ){
            $scope.numberOfPeople = undefined;
        }
    };

    $scope.sendOrder = function(){
        if( typeof $scope.tablenumber == 'undefined' ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.pleaseChoiseTablenumber+'</div>',
                size : 'small'
            });
            return;
        }

        if( typeof $scope.numberOfPeople == 'undefined' && $scope.tablenumber != 'Tackout' ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.pleaseChoiseNumberOfPeople+'</div>',
                size : 'small'
            });
            return;
        }
            
        var cnterr=0;
        for(var i=0;i<$scope.menuresult.length;i++){
            if( typeof $scope.menuresult[i].count == 'undefined' || $scope.menuresult[i].count == null ||
                $scope.menuresult[i].count == 0 ){
                cnterr++;
            }
        }
        if( cnterr == $scope.menuresult.length ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.pleaseChoiseMenu+'</div>',
                size : 'small'
            });
            return;
        }

        var tmporder = [];
        var tmpmessage = '';
        var sum = 0;
        tmpmessage += $scope.ml.tablenumber+" : "+$scope.tablenumber;
        if( $scope.numberOfPeople != undefined ){
            tmpmessage += ", "+$scope.ml.numberOfPeople+" : "+$scope.numberOfPeople;
        }
        tmpmessage += "<br>";
        for(var i=0;i<$scope.menuresult.length;i++){
            try {
                if( parseInt($scope.menuresult[i].count) > 0 ){
                    var obj = {
                        name:$scope.menuresult[i].name,
                        price:$scope.menuresult[i].price,
                        count:$scope.menuresult[i].count,
                        status:$scope.ml.notReady,
                    };
                    tmporder.push(obj);
                    tmpmessage += obj.name + " " + obj.price + " X " + obj.count+"<br>";
                    sum += parseInt(obj.price)*parseInt(obj.count);
                }
            } catch (error) {
                
            }
        }
        tmpmessage += $scope.ml.sum+" : "+sum;
        bootbox.confirm({
            title: "Re-determined",
            message: tmpmessage,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if( result ){
                    setDb($http,"userorder","insertone",
                        {
                            tablenumber:$scope.tablenumber,
                            numberOfPeople:$scope.numberOfPeople,
                            order:tmporder,
                            status:$scope.ml.notReady
                        },
                        function(){
                            getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
                        }
                    );
                }
            }
        });
    };

    $scope.modifyOrder = function(x){
        for(var i=0;i<x.order.length;i++){
            if( x.order[i].status == 1 ){
                bootbox.alert({
                    message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.cannotModify+'</div>',
                    size : 'small'
                });
                return;
            }
        }
        if( typeof $scope.tablenumber == 'undefined' ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.pleaseChoiseTablenumber+'</div>',
                size : 'small'
            });
            return;
        }
            
        var cnterr=0;
        for(var i=0;i<$scope.menuresult.length;i++){
            if( typeof $scope.menuresult[i].count == 'undefined' || $scope.menuresult[i].count == null ||
                $scope.menuresult[i].count == 0 ){
                cnterr++;
            }
        }
        if( cnterr == $scope.menuresult.length ){
            bootbox.alert({
                message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> '+$scope.ml.pleaseChoiseMenu+'</div>',
                size : 'small'
            });
            return;
        }

        var tmporder = [];
        var tmpmessage = '';
        var sum = 0;
        tmpmessage += $scope.ml.tablenumber+" : "+$scope.tablenumber+", ";
        tmpmessage += $scope.ml.numberOfPeople+" : "+$scope.numberOfPeople+"<br>";
        for(var i=0;i<$scope.menuresult.length;i++){
            try {
                if( parseInt($scope.menuresult[i].count) > 0 ){
                    var obj = {
                        name:$scope.menuresult[i].name,
                        price:$scope.menuresult[i].price,
                        count:$scope.menuresult[i].count,
                        status:$scope.ml.notReady,
                    };
                    tmporder.push(obj);
                    tmpmessage += obj.name + " " + obj.price + " X " + obj.count+"<br>";
                    sum += parseInt(obj.price)*parseInt(obj.count);
                }
            } catch (error) {
                
            }
        }
        tmpmessage += $scope.ml.sum+" : "+sum;
        bootbox.confirm({
            title: "Re-determined",
            message: tmpmessage,
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if( result ){
                    x.order = tmporder;
                    x.numberOfPeople = $scope.numberOfPeople;
                    setDb($http,"userorder","modifyone",x,
                        function(){
                            getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
                        }
                    );
                }
            }
        });
    };

    $scope.deleteOrder = function(x){
        setDb($http,"userorder","delone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    var calTmpsum = function(){
        var sum = 0;
        var tmporder = [];
        for(var i=0;i<$scope.menuresult.length;i++){
            try {
                if( parseInt($scope.menuresult[i].count) > 0 ){
                    var obj = {
                        name:$scope.menuresult[i].name,
                        price:$scope.menuresult[i].price,
                        count:$scope.menuresult[i].count,
                        status:$scope.ml.notReady,
                    };
                    tmporder.push(obj);
                    sum += parseInt(obj.price)*parseInt(obj.count);
                }
            } catch (error) {
                
            }
        }
        $scope.tmpsum = sum;
    };

    $scope.addCount = function(x){
        if( typeof x.count == 'undefined' ){
            x.count=1;
        }else{
            x.count++;
            if( x.count > 10 )
                x.count = 10;
        }

        calTmpsum();
    };

    $scope.reduceCount = function(x){
        if( typeof x.count == 'undefined' || x.count == 1 ){
            x.count=0;
        }else{
            x.count--;
            if( x.count < 0 )
                x.count = 0;
        }
        
        calTmpsum();
    };

    $scope.addCountDetal = function(x,y){
        if( typeof y.count == 'undefined' ){
            y.count=1;
        }else{
            y.count++;
            if( y.count > 10 ){
                y.count = 10;
                return;
            }
        }
        reUserOrderSum(x);
        setDb($http,"userorder","modifyone",x,function(){
                getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
            }
        );
    };

    $scope.reduceCountDetal = function(x,y){
        if( typeof y.count == 'undefined' || y.count == 1 ){
            y.count=0;
        }else{
            y.count--;
            if( y.count < 0 ){
                y.count = 0;
                return;
            }
        }
        if(y.count == 0){
            var index = x.order.indexOf(y);
            if(index > -1){
                x.order.splice(index, 1);
            }
        }
        reUserOrderSum(x);
        if( x.sum == 0 ){
            setDb($http,"userorder","delone",x,function(){
                    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
                }
            ); 
        }else{
            setDb($http,"userorder","modifyone",x,function(){
                    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
                }
            );
        }
    };

    getDb($http,"menu","all",function(result){
        $scope.menuresult = result;
        for(var i=0;i<$scope.menuresult.length;i++){
            $scope.menuresult[i].count = 0;
        }
    });

    getDb($http,"others","all",function(result){
        $scope.tableCountsShow = [];
        $scope.numberOfPeopleShow = [];

        //Multi language
        $scope.ml = getMultiLanguage(getOthersValue(result,'multiLanguage'));

        //tablenumber
        $scope.tableCountsShow.push($scope.ml.tackout);
        var tableCounts = getOthersValue(result,'tableCounts');
        for(var i=0;i<tableCounts;i++){
            $scope.tableCountsShow.push(i+1);
        }

        //number of people
        var number = getOthersValue(result,'numberOfPeople');
        for(var i=0;i<number;i++){
            $scope.numberOfPeopleShow.push(i+1);
        }

        $scope.tmpsum = 0;
    });

    var getDbCallback = function(result){
        $scope.userorderresult = result;
    };

    getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);

    var socket = io.connect('http://'+$location.host()+':'+port);
    socket.on('connect', function(data) {

    });
    socket.on('userorder_complete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
    socket.on('userorder_delete',function(){
        getDbSort($http,"userorder","allsorttoday","time",sortType,getDbCallback);
    });
});
