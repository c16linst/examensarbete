var module = angular.module('app', []);

module.controller('controller', function($scope) {
  $scope.changed = function() { alert('hej'); }
});
