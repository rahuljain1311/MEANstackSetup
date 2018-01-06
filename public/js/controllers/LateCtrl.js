angular.module('LateCtrl', []).controller('LateController', function($scope, $http, $filter) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	var date = new Date();
	$scope.date = $filter('date')(new Date(), 'dd/MM/yyyy');
});
