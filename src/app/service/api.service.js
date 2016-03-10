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
		
		var service = {
			supportedFunctions: supportedFunctions,
			login: roles,
			logout: roles,
			stations: stations
		};

		return service;

		////////////////

		function supportedFunctions() {
			return $http.get(_baseUrl + 'public/meta/SupportedFunctions');
		}

		function roles(auth) {
			return $http.get(_baseUrl + 'security/Roles/' + auth);
		}
		
		function stations(auth) {
			return $http.get(_baseUrl + 'mttws/configuration/Stations');
		}
	}
})();
