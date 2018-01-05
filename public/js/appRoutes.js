angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/user.html',
			controller: 'UserController'
		})

		.when('/late', {
			templateUrl: 'views/late.html',
			controller: 'LateController'
		})

		.when('/stats', {
			templateUrl: 'views/stats.html',
			controller: 'StatsController'	
		});

	$locationProvider.html5Mode(true);

}]);