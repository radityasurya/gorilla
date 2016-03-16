(function() {
	'use strict';

	angular
		.module('app.station')
		.controller('StationDetailController', StationDetailController);

	StationDetailController.$inject = ['$global', '$state', '$stateParams',
	'$ionicPopup', 'StationService', '$ionicHistory', '$rootScope',
	'$timeout', '$log'];

	/* @ngInject */
	function StationDetailController($global, $state, $stateParams,
	$ionicPopup, StationService, $ionicHistory, $rootScope,
	$timeout, $log) {
		var vm = this;
		console.log($stateParams);
		vm.currentStation = $stateParams;
		vm.logout = logout;
		vm.back = back;
		
		activate();

		////////////////

		function activate() {
			// Get BagToProcess
			// Get MonitoredStations
			console.log($rootScope.currentUser.monitoredStations);
		}
		
		function back() {
			console.log('clicked');
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
