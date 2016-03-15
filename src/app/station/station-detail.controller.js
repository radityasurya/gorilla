(function() {
	'use strict';

	angular
		.module('app.station')
		.controller('StationDetailController', StationDetailController);

	StationDetailController.$inject = ['$global', '$state', '$stateParams',
	'$ionicPopup', 'StationService', '$ionicHistory'];

	/* @ngInject */
	function StationDetailController($global, $state, $stateParams,
	$ionicPopup, StationService, $ionicHistory) {
		var vm = this;
		console.log($stateParams);
		vm.station = $stateParams;
		vm.logout = logout;
		vm.back = back;
		
		activate();

		////////////////

		function activate() {
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
				} else {
					console.log('do nothing');
				}
			});
		}
	}
})();
