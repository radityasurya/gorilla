(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('ApiService', ApiService);
	
	ApiService.$inject = ['$http'];

	/* @ngInject */
	function ApiService($http) {
		
		// Variable
		var _baseUrl = 'http://172.19.18.225/mttws/';
		var _timeout = 5000;
		
		var service = {
			BASE_URL: BASE_URL,
			getTimeout: getTimeout,
			setTimeout: setTimeout,
			supportedFunctions: supportedFunctions,
			login: roles,
			logout: roles,
			stations: stations
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
			return $http.get(BASE_URL() + 'public/meta/SupportedFunctions', {timeout:getTimeout()});
		}

		function roles(auth) {
			return $http.get(BASE_URL() + 'security/Roles/' + auth, {timeout:getTimeout()});
		}
		
		function stations(auth) {
			return $http.get(BASE_URL() + 'mttws/configuration/Stations/' + auth, {timeout:getTimeout()});
		}
	}
})();
