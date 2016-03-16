(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationService', StationService);

	StationService.$inject = ['ApiService', '$q', '$timeout', '$rootScope'];

	/* @ngInject */
	function StationService(ApiService, $q, $timeout, $rootScope) {
		
		// Variable
		var auth = $rootScope.currentUser.authdata;
		var _monitoredStations = {};
		var _currentStation = {};
		
		var service = {
			getStations: getStations,
			getMonitoredStations: getMonitoredStations
		};

		return service;

		////////////////

		function getStations() {
			var defer = $q.defer();
			
			ApiService.restCall('Stations', auth).then(function (response) {
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
		
		// Only handler and superman
		function getMonitoredStations() {
			console.log('getMonitoredStations');
			console.log($rootScope.currentUser.authdata);
			var defer = $q.defer();
			
			ApiService.restCall('MonitoredStations', $rootScope.currentUser.authdata)
			.then(function (response) {
				_monitoredStations = response.data;
				defer.resolve(response.data);
			}, function (response) {
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
	}
})();
