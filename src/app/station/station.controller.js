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
								'$timeout'
								];

	/* @ngInject */
	function StationController(
								$global,
								$state,
								UserService, 
								$ionicPopup,
								StationService,
								$timeout
								) {

		// Variable
		var vm = this;
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
