(function () {
	'use strict';
	angular
		.module('app')
		.factory('AuthInterceptor', factory);

	factory.$inject = ['$rootScope', '$q'];

	/* @ngInject */
	function factory($rootScope, $q) {
		var exports = {
			responseError: responseError
		};
		
		return exports;

		////////////////

		function responseError(response) {
			$rootScope.$broadcast({
				401: 'NOT AUTHENTICATED',
				403: 'NOT AUTHORIZED'
			}[response.status], response);
			
			return $q.reject(response);
		}
	}
})();
