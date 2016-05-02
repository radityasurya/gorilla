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

		function executeTask(task, bag) {
			var temp = [];
			
			var defer = $q.defer();
			
			ApiService.restCall(task,
							UserService.getUser().auth, 
							bag)
			.then(function (response) {
				defer.resolve(response);
			}, function (response) {
				defer.reject(response.data);
			});
			
			return defer.promise;
		}
	}
})();
