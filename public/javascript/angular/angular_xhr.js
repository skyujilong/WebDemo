/**
 * Created with JetBrains WebStorm.
 * User: yujilong
 * Date: 14-4-24
 * Time: 上午11:25
 * To change this template use File | Settings | File Templates.
 */

var phoneApp = angular.module("phonecatApp",[]);

phoneApp.controller("phoneList",function($scope,$http){
    $http.get("/angular/getTestPhonesData").success(function(data,status,headers,config){
        console.log("data:%o",data);
        console.log("status:%o",status);
        console.log("headers:%o",headers);
        console.log("config:%o",config);
        $scope.phones = data.result;
    });
    $scope.orderProp = "age";
});
