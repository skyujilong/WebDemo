/**
 * Created with JetBrains WebStorm.
 * User: yujilong
 * Date: 14-4-23
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var phonecatApp = angular.module('phonecatApp',[]);

phonecatApp.controller('PhoneListCtrl',function($scope){
    $scope.phones = [
        {'name': 'Nexus S',
            'snippet': 'Fast just got faster with Nexus S.',age:2},
        {'name': 'Motorola XOOM™ with Wi-Fi',
            'snippet': 'The Next, Next Generation tablet.',age:5},
        {'name': 'MOTOROLA XOOM™',
            'snippet': 'The Next, Next Generation tablet.',age:6}
    ];
    //增加一个默认值！ 如果没有默认值，则是一个undefine  也就是一个空的
    $scope.orderProp = 'name';
});
