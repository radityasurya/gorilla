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
									'BagService',
									'$cordovaBarcodeScanner',

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
								BagService,
								$cordovaBarcodeScanner
								) {

		// Variable
		var vm = this;
		vm.back = back;
		vm.isExist = isExist;
		vm.logout = logout;
		vm.bag = {};
		vm.scan = scan;
		
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
		
		function scan() {
			console.log('scan');

			document.addEventListener('deviceready', function () {
				$cordovaBarcodeScanner.scan().then(function (barcodeData) {

					if (barcodeData.text !== '') {
						$state.go('bag', {'bagTag': barcodeData.text});
					}

				}, function (error) {
					vm.text = error;
				});

			});

		}
		
		$scope.$on('$ionicView.enter', function() {
			
			activate();
		});

		function back() {
			console.log(vm.currentStation);
			$stateParams.bagTag = undefined;
			$state.go('station-detail', {'stationName': vm.currentStation});		}
		
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
			
			loadDestinationTab(bagFromJSON);
			loadPersonTab(bagFromJSON);
			loadProcessTab(bagFromJSON);
			loadFlightTab(bagFromJSON);
			loadStatusTab(bagFromJSON);
		}
		
		function loadDestinationTab(bagFromJSON) {
			vm.bag.destinations = bagFromJSON.outboundFlight;
			vm.bag.process = bagFromJSON.process;
			vm.bag.atl = getATL(bagFromJSON.reconciliation.authorityToLoad);
		}
		
		function loadPersonTab(bagFromJSON) {
			vm.person = bagFromJSON.passenger;
			vm.person.seat = bagFromJSON.reconciliation.seatNumber;
			vm.person.paxStatus = getPaxStatus(bagFromJSON.reconciliation.passengerStatus);
			vm.person.exception = getExceptions(bagFromJSON.exceptions);
		}
		
		function loadProcessTab(bagFromJSON) {
			vm.process = bagFromJSON.process;
			vm.process.handler = bagFromJSON.handler;
			vm.process.remarks = getRemarks(bagFromJSON.process.remarks);
		}
		
		function loadFlightTab(bagFromJSON) {
			vm.outbound = bagFromJSON.outboundFlight;
			vm.inbound = bagFromJSON.inboundFlight;
			vm.onwards = bagFromJSON.onwardFlights;
			
		}
		
		function loadStatusTab(bagFromJSON) {
			vm.status = bagFromJSON.container;
			vm.status.bagStatus = getBagStatus(bagFromJSON.bagStatusCode);
			vm.status.bagTagStatus = getBagTagStatus(bagFromJSON.reconciliation.baggageStatus);
		}
		
		function isExist(flights) {
			if (!angular.isUndefined(flights) && 
				!angular.isUndefined(flights.airline) && 
				!angular.isUndefined(flights.flightNumber)) {
				if (flights.airline !== null && flights.flightNumber !== null) {
					return true;
				}
			}
			else {
				return false;
			}
		}
		
		function getATL(ATL) {
			if (ATL) {
				return 'YES';
			} else {
				return 'NO';
			}
		}
				
		function getPaxStatus(paxStatus) {
			var status = '';
			
			if (paxStatus !== null) {
				switch (paxStatus.toUpperCase()) {
					case 'B':
						status = 'Boarded';
						break;
					case 'C':
						status = 'Checked in';
						break;
					case 'N':
						status = 'Not checked in';
						break;
					case 'S':
						status = 'Standby';
						break;
					default:
						status = paxStatus;
						break;
				}
			}
			
			return status;
		}
		
		function getBagStatus(bagStatus) {
			var status = '';

			if (bagStatus !== null) {
				switch (bagStatus.toUpperCase()) {
					case 'NAL':
						status = 'Loaded, NOT ATL';
						break;
					case 'OFF':
						status = 'Offloaded';
						break;
					case 'ONA':
						status = 'On hand, ATL';
						break;
					case 'OND':
						status = 'On hand, NOT ATL';
						break;
					case 'UNS':
						status = 'Unseen';
						break;
					default:
						status = bagStatus;
						break;
				}
			}

			return status;
		}
		
		function getBagTagStatus(bagTagStatus) {
			var status = '';

			if (bagTagStatus !== null) {
				switch (bagTagStatus.toUpperCase()) {
					case 'I':
						status = 'Inactive';
						break;
					case 'A':
						status = 'Active';
						break;
					case 'V':
						status = 'Validated';
						break;
					default:
						status = bagTagStatus;
						break;
				}
			}

			return status;
		}
		
		function getExceptions(exception) {
			var exceptions = '';
			if (exception != null)
			{
				for (var index = 0; index < exception.length; index++)
				{
					exceptions += exception[index];
					if (index < (exception.length - 1))
					{
						exceptions += '/';
					}
				}
			}
			
			return exceptions;
		}
		
		function getRemarks(remarks) {
			if (remarks != null) {
				return remarks[0];
			} else {
				return '';
			}
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
