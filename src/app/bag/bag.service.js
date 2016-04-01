(function () {
	'use strict';
	angular
		.module('app.bag')
		.factory('BagService', BagService);

	BagService.$inject = [
		'ApiService',
		'UserService',
		'$q',
		'$timeout'
	];

	/* @ngInject */
	function BagService(ApiService,
							UserService,
							$q,
							$timeout,
							$scope) {

		// Variable

		var service = {
			
		};

		return service;

		////////////////

	}
})();
