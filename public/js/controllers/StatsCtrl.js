angular.module('StatsCtrl', []).controller('StatsController', function($scope, $http) {

	$scope.tagline = 'The square root of life is pi!';	

	$http.get('/api/users').then(function(response){ $scope.names = response.data; });

	$scope.weekLateCount = function (id) {
		
		const days = 7;
		return $http.get('/api/lateCount/'+ days + '/' + id)
		.then(function(response){ 
			$scope.noOfDays = response.data.noOfDays; 
			$scope.lateCount = response.data.lateCount; 
		});
	}

	$scope.monthLateCount = function (id) {
		
		const days = 30;
		return $http.get('/api/lateCount/'+ days + '/' + id)
		.then(function(response){ 
			$scope.noOfDays = response.data.noOfDays; 
			$scope.lateCount = response.data.lateCount; 
		});
	}
});
