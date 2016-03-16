(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationController', StationController);

	StationController.$inject = ['$global', '$state', '$rootScope',
	'$ionicPopup', 'StationService', '$timeout'];

	/* @ngInject */
	function StationController($global, $state, $rootScope, $ionicPopup, StationService, $timeout) {
		var vm = this;

		// Variable
		
		vm.logout = logout;
				
		activate();

		////////////////

		function activate() {
			
			console.log('fired');
			
			vm.username = $rootScope.currentUser.username;
			
			StationService.getStations().then(function (data) {
				vm.stations = data;
			}, function (response) {
				console.log(response);
			});
			
			StationService.getMonitoredStations()
			.then(function (data) {
				console.log(data);
			}, function (response) {
				console.log(response);
			});
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
				} else {
					console.log('do nothing');
				}
			});
		}
	}
})();
