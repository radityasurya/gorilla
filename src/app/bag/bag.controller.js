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
									'$scope',
									'$timeout',
									'UserService',
									'BagService',
									'$cordovaBarcodeScanner',
									'TaskService',
								];

	/* @ngInject */
	function BagDetailController($global,
								$state,
								$stateParams,
								$ionicPopup,
								StationService,
								$ionicHistory,
								$scope,
								$timeout,
								UserService,
								BagService,
								$cordovaBarcodeScanner,
								TaskService
								) {

		// Variable
		var vm = this;
		vm.back = back;
		vm.isExist = isExist;
		vm.logout = logout;
		vm.bag = {};
		vm.scan = scan;
		vm.isError = false;
		vm.execute = execute;
		vm.hasTask = 'ReadOnly';
		
		////////////////

		function activate() {
			
			vm.currentStation = UserService.getCurrentStation().stationName;
						
			// Get Bag Details
			BagService.getBag($stateParams.lpn, vm.currentStation)
				.then(function (data) {
				console.log(data);
				if (angular.isUndefined(data.code)) {
					vm.isError = false;
					presentBag(data);
					loadBag(data);
				} else {
					vm.isError = true;
					console.log(data.message);
					vm.error = data.message;
				}
				
			}, function (response) {	// Error
				console.log(response);
			});
			
		}
		
		/**
		 * Scan function
		 */
		function scan() {
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
			console.log($stateParams);
			activate();
		});

		function back() {
			$stateParams.bagTag = undefined;
			$state.go('station-detail',
					{'stationName': vm.currentStation,
					'stationType': UserService.getCurrentStation().stationType,
					'locations':UserService.getCurrentStation().locations});		
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
		
		function checkScreening() {
			var screenPopup = $ionicPopup.confirm({
				title: 'Screen Bag',
				template: 'Please choose the options below'
			});
			
			screenPopup.then(function (res) {
				if (res) {
					console.log('clear');
				} else {
					console.log('cancel');
				}
			});
		}
		
		function execute() {
			if (!angular.isUndefined(vm.bag)) {
				console.log(vm.hasTask);
				
				switch (vm.hasTask) {
					case 'Release':
						TaskService.executeTask('ReleaseBag', vm.bag)
						.then(function (response) {
							back();
						}, 
							function (error) {
							console.log('error');  
						});
						break;
					case 'Screen':
						
						checkScreening();
						
						TaskService.executeTask('ScreenBag', vm.bag, 'CLEAR')
							.then(function (response) {
							back();
						}, 
							function (error) {
							console.log('error');  
						});
						break;
					case 'Store':
						TaskService.executeTask('StoreBag', vm.bag)
							.then(function (response) {
							back();
						}, 
							function (error) {
							console.log('error');  
						});
						break;
					case 'Deliver':
						TaskService.executeTask('DeliverBag', vm.bag)
							.then(function (response) {
							back();
						}, 
							function (error) {
							console.log('error');  
						});
						break;
					default:
					
						break;	
				}
			}
		}
		
		function presentBag(bagFromJSON) {
			if (!angular.isUndefined(bagFromJSON)) {
				// regardless of station, if bag can be released, show release
				if (BagService.canRelease(bagFromJSON)) {
					// release
					vm.hasTask = 'Release';
				} else {
					getTask(bagFromJSON);
				}
				console.log(vm.hasTask);
			}
		}
		
		function getTask(bagFromJSON) {
			var stationType = UserService.getCurrentStation().stationType;
			
			console.log(stationType);
			
			switch (stationType) {
				case 'Screening':
					if (BagService.canScreen(bagFromJSON)) {
						// Screen
						vm.hasTask = 'Screen';
					} else {
						// read only
						console.log('ReadOnly');
						vm.hasTask = 'ReadOnly';
					}
					break;
				case 'Store':
					if (BagService.canStore(bagFromJSON)) {
						// Store
						vm.hasTask = 'Store';
					} else {
						// read only
						console.log('readOnly');
						vm.hasTask = 'ReadOnly';
					}
					break;
				case 'Stillage':
					if (BagService.canDeliver(bagFromJSON)) {
						// deliver
						vm.hasTask = 'Deliver';
					} else {
						// read only
						vm.hasTask = 'ReadOnly';
					}
					break;
				default:
					// read only
					vm.hasTask = 'ReadOnly';
					break;	
			}
		}
		
		/**
		 * Loading bag from json files and show it on the view
		 * @param {object} bagFromJSON bag details from API response
		 */
		function loadBag(bagFromJSON) {
			vm.bag.lpn = bagFromJSON.lpn;
			vm.bag.task = bagFromJSON.task.description;		
			vm.bag.preposition = getPrePosition(bagFromJSON.task.description);
			vm.bag.destination = getDestination(bagFromJSON.task.destinations);
			vm.bag.proposedLocation = bagFromJSON.storeLocationProposal;
			vm.bag.currentStoreStation = bagFromJSON.currentStoreStation;
			vm.bag.currentStoreLocation = bagFromJSON.currentStoreLocation;
			vm.bag.registrationStatus = bagFromJSON.registrationStatus;
			
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
		
		/**
		 * Check if the flight is exist
		 * @param   {object}  flights data from API response
		 * @returns {boolean} true if the flight exists, or otherwise
		 */
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
		
		function getDestination(destinations) {
			var _destination = '';
			
			if (destinations[0] != null) {
				for (var i = 0; i < destinations.length; i++) {
					if (i > 0) {
						_destination += ', ';
					}
					_destination += destinations[i].name;
				}			
			}

			return _destination;
		}
		
		/**
		 * Get ATL
		 * @param   {boolean} ATL data from API response
		 * @returns {string}  yes if true, or otherwise
		 */
		function getATL(ATL) {
			if (ATL) {
				return 'YES';
			} else {
				return 'NO';
			}
		}
		
		/**
		 * Get the PAX status
		 * @param   {string} paxStatus data from API response
		 * @returns {string} complete sentence or word based on the char
		 */
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
		
		/**
		 * Get the bag status
		 * @param   {string} bagStatus data from API response
		 * @returns {string} complete sentences or word based on the char
		 */
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
		
		/**
		 * Get the bag tag status
		 * @param   {string} bagTagStatus data from API response
		 * @returns {string} complete sentences or word based on the char
		 */
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
		
		/**
		 * Get exception of the passenger
		 * @param   {Array}  exception from the API response
		 * @returns {string} a list of exceptions in one line
		 */
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
		
		/**
		 * get Remarks
		 * @param   {Array}  remarks from the API response
		 * @returns {string} remarks
		 */
		function getRemarks(remarks) {
			if (remarks != null) {
				return remarks[0];
			} else {
				return '';
			}
		}
		
		/**
		 * Get the preposition of the task
		 * @param   {string} taskdescription from the API response
		 * @returns {string} a preposition
		 */
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
