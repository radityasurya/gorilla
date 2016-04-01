(function () {
	'use strict';

	angular
		.module('app.bag')
		.controller('BagDetailController', BagDetailController);

	BagDetailController.$inject = [
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
	function BagDetailController($global,
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
		vm.back = back;
		vm.logout = logout;
		vm.lpn = $stateParams.bagTag;
		
		activate();
		
		////////////////

		function activate() {
			vm.currentStation = UserService.getCurrentStation();
		}

		function back() {
			$ionicHistory.goBack();
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

	}
})();
