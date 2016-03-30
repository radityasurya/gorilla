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
								'$ionicModal',
								'$scope',
								'PopupService',
								'$ionicHistory'
								];

	/* @ngInject */
	function StationController(
								$global,
								$state,
								UserService, 
								$ionicPopup,
								StationService,
								$timeout,
								$ionicModal,
								$scope,
								PopupService,
								$ionicHistory
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
		
		$ionicModal.fromTemplateUrl('/app/modal/barcode-modal.html', {
			scope: $scope,
			animation: 'slide-in-up',
			backdropClickToClose: true
		}).then(function (modal) {
			$scope.modal = modal;
		});

        function scan() {
			console.log('scan');
			var alertPopup = $ionicPopup.alert({
				title: 'Scan location',
				template: 'Please scan location or enter manually'
			});
			PopupService.register(alertPopup);
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
