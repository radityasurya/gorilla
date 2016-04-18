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
										'$scope',
										'$timeout',
										'UserService',
										'$cordovaBarcodeScanner',
										'$ionicPlatform'
									];

	/* @ngInject */
	function StationDetailController($global,
									$state,
									$stateParams,
									$ionicPopup,
									StationService,
									$ionicHistory,
									$scope,
									$timeout,
									UserService,
									$cordovaBarcodeScanner,
									$ionicPlatform) {
		
		// Variable
		var vm = this;
				
		UserService.setCurrentStation($stateParams.stationName);
		vm.currentStation = $stateParams.stationName;
		vm.logout = logout;
		vm.monitor = monitor;
		vm.back = back;
		vm.scan = scan;
		vm.isExist = false;
		vm.setTaskDescription = setTaskDescription;
		vm.getIcon = getIcon;

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
				//console.log(response);
				if (angular.equals('', response)) {
					vm.isExist = false;
				} else if (angular.equals([], response)) {
					vm.isExist = false;
				}else { 
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
		
		$ionicPlatform.on('volumeupbutton', function() {
			scan();
		});
		
		function back() {
			// $ionicHistory.goBack();
			$state.go('station');
		}
		
		function monitor() {
			$state.go('station-monitor');
		}
		
		function scan() {
			console.log('scan');

			document.addEventListener('deviceready', function () {
				$cordovaBarcodeScanner.scan().then(function (barcodeData) {
					
					if (barcodeData.text !== '') {
						$state.go('bag', {'bagTag': barcodeData.text});
					}
					
				}, function (error) {
					vm.text = error;
				});

			});

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
		
		function getIcon(taskDescription) {
			var icon = '';

			if (taskDescription !== null)
			{
				switch (taskDescription.toLowerCase())
				{
					case 'store':
						icon = 'Store.png';
						break;
					case 'screen':
						icon = 'Screening.png';
						break;
					case 'deliver':
						icon = 'Stillage.png';
						break;
					case 'release':
						icon = 'StationTypeRelease.png';
						break;
					default:
						icon = 'Store.png';
						break;
				}
			}

			return icon;
		}
		
		function getPrePosition(taskDescription)
		{
			var prePosition = '';

			if (taskDescription !== null)
			{
				switch (taskDescription.toLowerCase())
				{
					case 'store':
						prePosition = ' in ';
						break;
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
