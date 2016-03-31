(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationController', StationController);

	StationController.$inject = [
								'$global',
								'$state',
								'UserService',
								'$ionicPopup',
								'StationService',
								'$timeout',
								'$scope',
								'PopupService',
								'$ionicHistory',
								'$cordovaBarcodeScanner'
								];

	/* @ngInject */
	function StationController(
								$global,
								$state,
								UserService, 
								$ionicPopup,
								StationService,
								$timeout,
								$scope,
								PopupService,
								$ionicHistory,
								$cordovaBarcodeScanner
								) {

		// Variable
		var vm = this;
		vm.back = back;
		vm.scan = scan;
		vm.logout = logout;
		vm.isCurrentStationExist = false;

		activate();

		////////////////

		function activate() {

			vm.username = UserService.getUser().username;
						
			// Populate Station Views
			StationService.getStations().then(function (data) {
				vm.stations = data;
			}, function (response) {	// Error
				console.log(response);
			});
			
			vm.isCurrentStationExist = isCurrentStationExist(UserService.getCurrentStation());
		}
									
		$scope.$on('$ionicView.enter', function() {
			activate();
		});
		
        function scan() {
			console.log('scan');
			
			document.addEventListener('deviceready', function () {
				$cordovaBarcodeScanner.scan().then(function (barcodeData) {
					alert(barcodeData.text + '\n' + barcodeData.format);
				}, function (error) {
					vm.text = error;
				});
				
			});

		}
									
		function back() {
			var stationName = UserService.getCurrentStation();
			$state.go($ionicHistory.forwardView().stateName,
			{'stationName' : stationName});
		}
									
		function isCurrentStationExist(station) {
			if (station === 'default') {
				return false;
			} else {
				return true;
			}
		}

		function logout() {

			var confirmPopup = $ionicPopup.confirm({
				title: 'Logout',
				template: 'Are you sure you want to logout?'
			});

			confirmPopup.then(function (res) {
				if (res) {
					$global.logout();
					$state.go('login');
				}
			});
		}
	}
})();
