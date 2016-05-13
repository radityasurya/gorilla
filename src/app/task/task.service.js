(function () {
	'use strict';

	angular
		.module('app.service')
		.service('TaskService', TaskService);

	TaskService.$inject = [
		'ApiService',
		'UserService',
		'$q',
	];

	/* @ngInject */
	function TaskService(ApiService,
						UserService,
						$q) {
		
		var service = {
			executeTask: executeTask,
		};
		
		return service;

		////////////////

		function executeTask(task, bag, screeningResult = '') {
			
			var data = {
				'lpn': bag.lpn,
				'isLpnScanned': 'false',
				'station': UserService.getUser().currentStation.stationName,
				'device': 'Emulator'
			};
			
			if (task === 'StoreBag') {
				console.log('StoreBag');
				data.storeLocation = 'PB Store 2';
			}
			
			if (task === 'ScreenBag') {
				console.log('ScreenBag');
				data.screeningProcess = 'ECAC';
				data.screeningResult = screeningResult;
			}
			
			console.log(data.lpn);
			
			data = angular.toJson(data);
			
			var defer = $q.defer();
			
			ApiService.restCall(task,
							UserService.getUser().auth, 
							data)
			.then(function (response) {
				defer.resolve(response);
			}, function (response) {
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
	}
})();
