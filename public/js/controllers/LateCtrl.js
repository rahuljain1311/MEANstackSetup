angular.module('LateCtrl', []).controller('LateController', function($scope, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	var date = new Date();
	$scope.date = new Date();

	$http.get('/api/users').then(function(response){ $scope.names = response.data; });

	$scope.markLate = function (id) {
		
		const parameters = JSON.stringify({
			date: $scope.userdate,
			isLate: true
		})
		return $http.put('/api/user/'+ id, parameters) // Send date and boolean isLate = true
		.then(function(response){ 
			$scope.names = response.data;
		});
	}

	$scope.markEarly = function (id) {
		
		const parameters = JSON.stringify({
			date: $scope.userdate,
			isLate: false
		})
		return $http.put('/api/user/'+ id, parameters) // Send date and boolean isLate = false
		.then(function(response){ 
			$scope.names = response.data;
		});
	}
});
