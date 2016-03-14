(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationService', StationService);

	StationService.$inject = ['ApiService', '$q', '$timeout'];

	/* @ngInject */
	function StationService(ApiService, $q, $timeout) {
		
		var service = {
			getStations: getStations
		};

		return service;

		////////////////

		function getStations() {
			var defer = $q.defer();
			
			ApiService.stations().then(function (response) {
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
