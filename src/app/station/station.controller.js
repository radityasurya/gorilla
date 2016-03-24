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
								'$scope'
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
								$scope
								) {

		// Variable
		var vm = this;
		vm.scan = scan;
		vm.logout = logout;

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
			
		}
		
		$ionicModal.fromTemplateUrl('/app/modal/barcode-modal.html', {
			scope: $scope,
			animation: 'slide-in-up',
			backdropClickToClose: true
		}).then(function (modal) {
			$scope.modal = modal;
		});

        function scan() {
			console.log('scan');
			$scope.modal.show();
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
