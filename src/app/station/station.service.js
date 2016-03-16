(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationService', StationService);

	StationService.$inject = ['ApiService', '$q', '$timeout', '$rootScope'];

	/* @ngInject */
	function StationService(ApiService, $q, $timeout, $rootScope) {
				
		var auth = $rootScope.currentUser.authdata;
		
		var service = {
			getStations: getStations
		};

		return service;

		////////////////

		function getStations() {
			var defer = $q.defer();
			
			ApiService.stations(auth).then(function (response) {
				console.log(response.data);
				//$timeout(function () {
					defer.resolve(response.data);
				//},5000);
			}, function (response) {
				console.log(response);
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
	}
})();
