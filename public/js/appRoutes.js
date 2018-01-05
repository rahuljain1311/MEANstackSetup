angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/user.html',
			controller: 'MainController'
		})

		.when('/late', {
			templateUrl: 'views/late.html',
			controller: 'NerdController'
		})

		.when('/stats', {
			templateUrl: 'views/stats.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);