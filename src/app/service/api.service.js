(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('ApiService', ApiService);
	
	ApiService.$inject = ['$http', '$q'];

	/* @ngInject */
	function ApiService($http, $q) {
		
		// Variable
		var _baseUrl = 'http://172.19.18.225/mttws/';
		var _supportedFunction = {};
		var _timeout = 5000;
				
		var service = {
			BASE_URL: BASE_URL,
			getTimeout: getTimeout,
			setTimeout: setTimeout,
			supportedFunctions: supportedFunctions,
			getURI: getURI,
			restCall: restCall
		};

		return service;

		////////////////
		
		function BASE_URL() {
			return _baseUrl;
		}
		
		function getTimeout() {
			return _timeout;
		}
		
		function setTimeout(t) {
			_timeout = t;
		}

		function supportedFunctions() {
			/*return $http.get(BASE_URL() + 'public/meta/SupportedFunctions', {timeout:getTimeout()});*/
			
			var defer = $q.defer();
			
			$http.get(BASE_URL() + 'public/meta/SupportedFunctions')
			.then(
				function (response) { 
					defer.resolve(response.data); 
					setSupportedFunctions(response.data);
				},
				function (response) { 
					defer.reject(response); 
				}
			);
			
			return defer.promise;
		}
		
		function setSupportedFunctions(supportedFunctions) {
			_supportedFunction = supportedFunctions;
		}
		
		function getURI(name) {
			
			var URI = '';
			
			angular.forEach(_supportedFunction, function(value, key) {
				if (key === name) {
					URI = value.uri;
				}
			});
			
			return BASE_URL() + URI;
		}
		
		function restCall(name, auth) {
			return $http.get(getURI(name) + '/' + auth);
		}

	}
})();
