var app = angular.module('nestable', ['ui-nestable']);
app.controller('nestableCtl', ['$scope', '$http', function($scope, $http) {
   $http.get('json/rule.json').success(function(data) {
        $scope.items=data;
        console.log(data);
    });

}]);
