(function() {
	'use strict';

	angular
		.module('app.station')
		.controller('StationMonitorController', StationMonitorController);

	StationMonitorController.$inject = ['UserService', 'StationService', '$ionicHistory'];

	/* @ngInject */
	function StationMonitorController(UserService, StationService, $ionicHistory) {
		
		// Variable
		var vm = this;
		vm.property = 'StationMonitorController';
		vm.back = back;
		vm.selectAll = selectAll;
		vm.deselectAll = deselectAll;
		
		activate();

		////////////////

		function activate() {
			
			var monitoredStations = UserService.getMonitoredStations();
			
			vm.storeStations = populateViews(monitoredStations);
		}
		
		function back() {
			$ionicHistory.goBack();
		}
		
		function populateViews(monitoredStations) {
			var temp = [];
			
			for	(var key in monitoredStations) {
				if (key !== null) {
					temp.push({'stationName': key, 'checked' : true});
				}
			}
			
			return temp;
		}
		
		function selectAll() {
			angular.forEach(vm.storeStations, function (station) {
				station.checked = true;
			});
		}
		
		function deselectAll() {
			angular.forEach(vm.storeStations, function (station) {
				station.checked = false;
			});		
		}
	}
})();
