(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationController', StationController);

	StationController.$inject = ['$global', '$state', '$rootScope', '$ionicPopup'];

	/* @ngInject */
	function StationController($global, $state, $rootScope, $ionicPopup) {
		var vm = this;
		vm.property = 'Controller';
		
		vm.logout = logout;
				
		activate();

		////////////////

		function activate() {
			vm.supportedFunctions = $global.getSupport();
			vm.username = $rootScope.currentUser.username;
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
