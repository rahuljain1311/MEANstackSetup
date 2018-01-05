angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	
	return $http.get('/api/nerds')
	.then(function(response){ $scope.line = response; });

});