(function () {
	'use strict';
	angular
		.module('app.login')
		.factory('AuthService', factory);

	factory.$inject = ['$http', '$rootScope', 'base64'];

	/* @ngInject */
	function factory($http, $rootScope, $base64) {

		var service = {
			login: login,
			setCredentials: setCredentials,
			resetCredentials: resetCredentials
		};

		return service;

		////////////////

		// LOGIN! siapin credentials dulu, abis itu check di mttws/roles

		function login(username, password, callback) {
			console.log('-- Begin Auth Service --');
			var url = 'http://172.21.27.17:7003/mttws/security/Roles';
			var headersdata = provideHeader(username, password);
			
			console.log('-- Setup HTTP Headers --');
			console.log(headersdata);

			console.log('-- Check authentication --');
			$http.get(url, {
					headers: headersdata
				})
				.then(function (headers) {
					console.log(headers);
					callback(headers);
				});
		}

		function setCredentials(username, password) {

		}

		function resetCredentials() {
			$rootScope.globals = {};
			$http.defaults.common.Authorization = 'Basic';
		}

		function provideHeader(username, password) {
			var authdata = $base64.encode(username + ':' + password);
			
			return {
				'Authorization': 'Basic ' + authdata,
				'Accept': 'application/json',
				'Accept-Language': 'en-GB',
				'Content-Type': 'application/json; charset=utf-8'
			};
		}
	}
})();
