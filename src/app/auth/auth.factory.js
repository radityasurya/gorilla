(function () {
	'use strict';
	
	angular
		.module('app')
		.factory('AuthService', factory);

	factory.$inject = ['$http', '$rootScope'];

	/* @ngInject */
	function factory($http, $rootScope) {

		var service = {
			login: login
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

		function provideHeader(username, password) {
			//var authdata = $base64.encode(username + ':' + password);
			var authdata = 'hehe';
			return {
				'Authorization': 'Basic ' + authdata,
				'Accept': 'application/json',
				'Accept-Language': 'en-GB',
				'Content-Type': 'application/json; charset=utf-8'
			};
		}
	}
})();
