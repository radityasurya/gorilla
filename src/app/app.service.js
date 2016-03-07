(function () {
	'use strict';

	angular
		.module('app')
		.constant('AUTH_EVENTS', {
		notAuthenticated: 'auth-not-authenticated'
		})
		.factory('$global', global);

	global.$inject = ['$http', '$base64', '$q', '$rootScope'];

	var _suppFunction;

	/* @ngInject */
	function global($http, $base64, $q, $rootScope) {

		// Variable 
		var _url = 'http://172.19.18.225/mttws/';
		var _path = 'public/meta/SupportedFunctions';
		
		// User
		var user = {
			username: '',
			password: '',
			roles: {}
		};
		
		var service = {
			setUser: setUser,
			isLoggedIn: isLoggedIn,
			setSupport: setSupport,
			getSupport: getSupport,
			fetchSupport: fetchSupport,
			login: login,
			logout: logout,
			setCredentials: setCredentials,
			resetCredentials: resetCredentials
		};

		return service;

		////////////////
		
		function setUser(uname, pw) {
			user.username = uname;
			user.password = pw;
			user.roles = {};
		}
		
		function isLoggedIn() {
			return false;
		}

		function setSupport(json) {
			_suppFunction = angular.copy(json);
			console.log(_suppFunction);
		}

		function fetchSupport() {
			var defer = $q.defer();

			$http.get('http://172.19.18.225/mttws/public/meta/SupportedFunctions')
				.then(function (response) {
					defer.resolve(response.data);
				}, function (response) {
					defer.reject(response);
				});

			return defer.promise;
		}

		function getSupport() {
			return _suppFunction;
		}

		function login(username, password, callback) {
			var deferred = $q.defer();

			console.log('login');
			console.log('-- Begin Authenticating Service --');
			var url = 'http://172.19.18.225/mttws/security/Roles/' + username + '/' + password;
			var headersdata = provideHeader(username, password);

			console.log(headersdata);

			$http.get(url)
				.then(function (response) {
					setCredentials(username, password);
					deferred.resolve(response.data);
				}, function (response) {
					deferred.reject(response);
				});

			return deferred.promise;
		}
		
		function logout() {
			// Reset headers
			resetCredentials();
			
			$http.get('/mttws/security/Roles/logout/logout')
				.then(function (data) {
					console.log(data);
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
