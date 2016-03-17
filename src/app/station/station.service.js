(function () {
	'use strict';
	angular
		.module('app.station')
		.factory('StationService', StationService);

	StationService.$inject = ['ApiService', 'UserService', '$q', '$timeout'];

	/* @ngInject */
	function StationService(ApiService, UserService, $q, $timeout, $scope) {
				
		var service = {
			getStations: getStations,
			getMonitoredStations: getMonitoredStations,
			getBagsToProcess: getBagsToProcess,
			createParams: createParams
		};

		return service;

		////////////////

		function getStations() {
						
			var defer = $q.defer();
			
			ApiService.restCall('Stations', UserService.getUser().auth, '').then(function (response) {
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
			var defer = $q.defer();
			
			console.log(UserService.getUser().auth);
			
			ApiService.restCall('MonitoredStations', UserService.getUser().auth, '')
			.then(function (response) {
				console.log(response);
				UserService.setMonitoredStations(response.data);
				defer.resolve(response.data);
			}, function (response) {
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
		
		function getBagsToProcess(currentStation, device, monitoredStations) {
			var defer = $q.defer();
			
			ApiService.restCall('BagsToProcess',
								UserService.getUser().auth,
								createParams(currentStation, device, monitoredStations))
			.then(function (response) {
				console.log(response);
				defer.resolve(response.data);
			}, function (response) {
				console.log(response);
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
		
		function createParams(currentStation, device, monitoredStations) {
			var _url = '&station=' + currentStation;
			_url += '&device=' + device;
			
			// Add storeStation
			for (var key in monitoredStations) {
				if (key !== null) {
					_url += ('&StoreStation[]=' + key);
				}
			}
			
			return _url;
		}
	}
})();
