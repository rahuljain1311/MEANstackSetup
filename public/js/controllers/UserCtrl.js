angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {

	$scope.tagline = 'To the moon and back!';	
	
	$scope.deleteUser = function (id) {
		
		return $http.delete('/api/user/'+ id)
		.then(function(response){ $scope.names = response.data; });
	}

	$http.get('/api/users').then(function(response){ $scope.names = response.data; });
});
