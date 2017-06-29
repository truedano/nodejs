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
                getDb($http,"menu","all",function(result){
                    $scope.menuresult = result;
                });
            }
        );
    };

    $scope.delOneDb = function(x){
        setDb($http,"menu","delone",x,function(){
                getDb($http,"menu","all",function(result){
                    $scope.menuresult = result;
                    
                });
            }
        );
    };

    $scope.delAllDb = function(){
        setDb($http,"menu","delall",null,function(){
                getDb($http,"menu","all",function(result){
                    $scope.menuresult = result; 
                });
            }
        );
    };

    $scope.modifyOneDb = function(x){
        setDb($http,"menu","modifyone",x,function(){
                getDb($http,"menu","all",function(result){
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
                {name:'businessEndMinute',value:$scope.businessEndMinute}
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
                    getDb($http,"menu","all",function(result){
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
                    getDb($http,"menu","all",function(result){
                        $scope.menuresult = result;
                    });
                }
            );
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

    var options = {
		title: {
			text: "Day Income"
		},
        animationEnabled: true,
		data: [
            {
                type: "spline", //change it to line, area, column, pie, etc
                dataPoints: [
                    { x: 10, y: 10 },
                    { x: 20, y: 12 },
                    { x: 30, y: 8 },
                    { x: 40, y: 14 },
                    { x: 50, y: 6 },
                    { x: 60, y: 24 },
                    { x: 70, y: -4 },
                    { x: 80, y: 10 }
                ]
            }
		]
	};

	$("#chartContainer").CanvasJSChart(options);

});
