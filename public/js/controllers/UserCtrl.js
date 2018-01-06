angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {

	$scope.tagline = 'To the moon and back!';	
	return $http.get('/api/users')
	.then(function(response){ $scope.names = response.data; });
});
