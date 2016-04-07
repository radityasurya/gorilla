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
									'UserService',
									'BagService'
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
								UserService,
								BagService) {

		// Variable
		var vm = this;
		vm.back = back;
		vm.logout = logout;
		vm.lpn = $stateParams.bagTag;
		
		activate();
		
		////////////////

		function activate() {
			vm.currentStation = UserService.getCurrentStation();
						
			BagService.getBag(vm.lpn, vm.currentStation)
			.then(function (data) {
				console.log(data);
				vm.task = data.task.description;
			}, function (response) {	// Error
				console.log(response);
			});
			
		}
		
		$scope.$on('$ionicView.enter', function() {

			activate();
		});

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
