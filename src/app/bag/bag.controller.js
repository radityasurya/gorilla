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
		vm.bag = {};
				
		////////////////

		function activate() {
			vm.currentStation = UserService.getCurrentStation();
						
			BagService.getBag($stateParams.bagTag, vm.currentStation)
			.then(function (data) {
				console.log(data);
				loadBag(data);
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
		
		function loadBag(bagFromJSON) {
			vm.bag.lpn = bagFromJSON.lpn;
			vm.bag.task = bagFromJSON.task.description;		
			vm.bag.preposition = getPrePosition(bagFromJSON.task.description);
			vm.bag.destination = bagFromJSON.task.destinations[0].name;
			vm.bag.proposedLocation = bagFromJSON.storeLocationProposal;
		}
		
		function getPrePosition(taskdescription)
		{
			var prePosition = '';

			if (taskdescription !== null)
			{
				switch (taskdescription.toLowerCase())
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
