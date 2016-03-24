(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationDetailController', StationDetailController);

	StationDetailController.$inject = [
										'$global',
										'$state',
										'$stateParams',
										'$ionicPopup',
										'StationService',
										'$ionicHistory',
										'$rootScope',
										'$scope',
										'$timeout',
										'UserService'
									];

	/* @ngInject */
	function StationDetailController($global,
									$state,
									$stateParams,
									$ionicPopup,
									StationService,
									$ionicHistory,
									$rootScope,
									$scope,
									$timeout,
									UserService) {
		
		// Variable
		var vm = this;
		
		UserService.setCurrentStation($stateParams);
		vm.currentStation = $stateParams;
		vm.logout = logout;
		vm.monitor = monitor;
		vm.back = back;
		vm.isExist = false;
		vm.setTaskDescription = setTaskDescription;

		////////////////

		function activate() {
			
			// Register Monitor
			StationService.registerMonitor(UserService.getMonitoredStations())
				.then(function (response) {
				// console.log(response);
			}, function (response) {
				console.log(response);
			});

			// Get BagToProcess
			StationService.getBagsToProcess(
				UserService.getCurrentStation(),
				'Emulator',
				UserService.getMonitoredStations())
				.then(function (response) {

				if (angular.equals([], response)) {
					vm.isExist = false;
				} else { 
					vm.isExist = true;
				}

				vm.bagsToProcess = response;
			}, function (response) {
				console.log(response);
				vm.isExist = false;
			});

		}
		
		$scope.$on('$ionicView.enter', function() {

			activate();
		});

		function back() {
			$ionicHistory.goBack();
		}
		
		function monitor() {
			$state.go('station-monitor');
		}

		function logout() {
			console.log('logout');

			var confirmPopup = $ionicPopup.confirm({
				title: 'Logout',
				template: 'Are you sure you want to logout?'
			});

			confirmPopup.then(function (res) {
				if (res) {
					$global.logout();
					$state.go('login');
					$timeout(function () {
						$ionicHistory.clearCache();
						$ionicHistory.clearHistory();
					}, 300);
				} else {
					console.log('do nothing');
				}
			});
		}
		
		function setTaskDescription(bag) {
			var _description = '';
			
			_description += bag.taskDescription;
			_description += getPrePosition(bag.taskDescription);
			_description += bag.taskDestinations;
						
			return _description;
		}
		
		function getPrePosition(taskdescription)
		{
			var prePosition = '';

			if (taskdescription !== null)
			{
				switch (taskdescription.toLowerCase())
				{
					case 'store':
					case 'screen':
						prePosition = ' at ';
						break;
					case 'deliver':
						prePosition = ' to ';
						break;
					case 'release':
						prePosition = ' from ';
						break;
					default:
						prePosition = ' at ';
						break;
				}
			}

			return prePosition;
		}
	}
})();
