(function () {
	'use strict';

	angular
		.module('app')
		.factory('$global', global);

	global.$inject = ['$http', '$base64', '$q', '$rootScope'];
	
	var _suppFunction;
	
	/* @ngInject */
	function global($http, $base64, $q, $rootScope) {

		// Variable 
		var _url = 'http://172.21.27.17:7003/';
		var _path = 'mttws/public/meta/SupportedFunctions';

		var service = {
			setSupport: setSupport,
			getSupport: getSupport,
			fetchSupport: fetchSupport,
			login: login,
			setCredentials: setCredentials,
			resetCredentials: resetCredentials
		};

		return service;

		////////////////

		function setSupport(json) {
			_suppFunction = angular.copy(json);
			console.log(_suppFunction);
		}

		function fetchSupport() {
			var defer = $q.defer();
			
			$http.get(_url + _path)
			.then(function (response) {
				defer.resolve(response.data);
			}, function (response) {
				defer.reject(response);
			});
			
			return defer.promise;
		}

		function getSupport() {
			console.log(_suppFunction);
			return _suppFunction;
		}

		function login(username, password, callback) {
			console.log('login');
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
			var authdata = $base64.encode(username + ':' + password);
			//var authdata = 'hehe';
			return {
				'Authorization': 'Basic ' + authdata,
				'Accept': 'application/json',
				'Accept-Language': 'en-GB',
				'Content-Type': 'application/json; charset=utf-8'
			};
		}
		
		function setCredentials(username, password) {
			var authdata = $base64.encode(username + ':' + password);
			
			$rootScope.globals = {
				currentUser: {
					username: username,
					authdata: authdata
				}
			};
			
			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
		}
		
		function resetCredentials() {
			$rootScope.globals = {};
			$http.defaults.headers.common.Authorization = 'Basic';
		}
	}
})();
