(function () {
	'use strict';
	angular
		.module('app')
		.factory('GlobalFactory', factory);

	factory.$inject = ['$http', '$rootScope'];

	/* @ngInject */
	function factory($http, $rootScope) {
		var baseUrl = 'http://172.21.27.17:7003/';
		var url = baseUrl + 'mttws/public/meta';
		var suppFunctions = [];
		
		var factory = {
			getSupportedFunctions: getSupportedFunctions,
			getSFComplete: getSFComplete,
			getSFError: getSFError
		};

		return factory;

		////////////////
				
		function getSupportedFunctions() {
			return $http.get(url)
				.then(getSFComplete, getSFError);
		}

		function getSFComplete(response) {
			return response;
		}

		function getSFError(response) {
			console.log(response.status);
			return response;
		}
		
	}
})();
