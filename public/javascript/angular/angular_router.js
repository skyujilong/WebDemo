/**
 * Created with JetBrains WebStorm.
 * User: yujilong
 * Date: 14-4-24
 * Time: 下午4:33
 * To change this template use File | Settings | File Templates.
 */
//后面的[]是依赖关系
var phoneApp = angular.module("phonecatApp", ['ngRoute', 'phonecatControllers']);

phoneApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/phones', {
        //这里实际上要的是纯文本
        templateUrl: '/angular/getMainListTemplate',
        controller: 'PhoneList'
    }).when('/phones/:phoneId', {
            templateUrl:'/angular/getDetailTemplate',
            controller:'PhoneDetail'
        }).otherwise({
            redirectTo:'/phones'
        });
}]);

var phonecatControllers = angular.module("phonecatControllers",[]);

phonecatControllers.controller('PhoneList',['$scope','$http',function($scope,$http){
    $http.get("/angular/getTestPhonesData").success(function(data,status,headers,config){
        $scope.phones = data.result;
    });
    $scope.orderProp = "age";
}]);


phonecatControllers.controller('PhoneDetail',['$scope','$routeParams',function($scope,$routeParams){
    $scope.phoneId = $routeParams.phoneId;
}]);