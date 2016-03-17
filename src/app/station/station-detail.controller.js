(function() {
	'use strict';

	angular
		.module('app.station')
		.controller('StationDetailController', StationDetailController);

	StationDetailController.$inject = ['$global', '$state', '$stateParams',
	'$ionicPopup', 'StationService', '$ionicHistory', '$rootScope',
	'$timeout', '$log', 'UserService'];

	/* @ngInject */
	function StationDetailController($global, $state, $stateParams,
	$ionicPopup, StationService, $ionicHistory, $rootScope,
	$timeout, $log, UserService) {
		var vm = this;
		UserService.setCurrentStation($stateParams);
		vm.currentStation = $stateParams;
		vm.logout = logout;
		vm.back = back;
		vm.isExist = false;
		
		activate();

		////////////////

		function activate() {
			// Get MonitoredStations
			console.log(UserService.getMonitoredStations());
			
			// Get BagToProcess
			StationService.getBagsToProcess(
				UserService.getCurrentStation(),
				'Emulator',
				UserService.getMonitoredStations())
			.then(function (response) {
				console.log(response);
			}, function (response) {
				console.log(response);
			});
		}
		
		function back() {
			console.log('back');
			$ionicHistory.goBack();
		}
		
		function logout() {
			console.log('logout');

			var confirmPopup = $ionicPopup.confirm({
				title: 'Logout',
				template: 'Are you sure you want to logout?'
			});

			confirmPopup.then(function(res) {
				if (res) {
					$global.logout();
					$state.go('login');
					$timeout(function () {
						$ionicHistory.clearCache();
						$ionicHistory.clearHistory();
						$log.debug('clearing cache');
					},300);
				} else {
					console.log('do nothing');
				}
			});
		}
	}
})();
