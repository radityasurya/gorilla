(function () {
	'use strict';

	angular
		.module('app.service')
		.factory('$global', global);

	global.$inject = ['$http', '$base64', '$q', '$rootScope', 'ApiService'];

	/* @ngInject */
	function global($http, $base64, $q, $rootScope, ApiService, $ionicLoading) {
		
		var suppFunction = [];
		
		$rootScope.currentUser = {
			username: '',
			authdata: '',
			isLoggedIn: false
		};
		
		var service = {
			setSupport: setSupport,
			getSupport: getSupport,
			fetchSupport: fetchSupport,
			login: login,
			logout: logout,
			setCredentials: setCredentials,
			resetCredentials: resetCredentials,
			encrypt64: encrypt64
		};

		return service;

		////////////////
				
		function setSupport(json) {
			suppFunction = angular.copy(json);
		}

		function fetchSupport() {
			var defer = $q.defer();
			ApiService.supportedFunctions()
				.then(function (response) {
					defer.resolve(response.data);
				}, function (response) {
					defer.reject(response);
				});

			return defer.promise;
		}

		function getSupport() {
			return suppFunction;
		}

		function login(username, password, callback) {
			var deferred = $q.defer();

			// console.log('-- Begin Authenticating Service --');
			var authdata = $base64.encode(username + ':' + password);
			
			ApiService.login(authdata)
				.then(function (response) {
				// Register User
				setCredentials(username, authdata);
				deferred.resolve(response.data);
			}, function (response) {
				// Error
				deferred.reject(response);
			});

			return deferred.promise;
		}
		
		function logout() {
			var deferred = $q.defer();
			
			// Reset Credentials
			resetCredentials();
			
			ApiService.logout('')
				.then(function (response) {
					// Cannot logout
				deferred.resolve(response);
			}, function (response) {
				// Logout Success
				resetCredentials();
				deferred.reject(response);
			});
			
			return deferred.promise;
		}

		function setCredentials(username, authdata) {
			$rootScope.currentUser = {
				username: username,
				authdata: authdata,
				isLoggedIn: true
			};
			
			// console.log($rootScope.currentUser);
		}

		function resetCredentials() {
			$rootScope.currentUser = {
				username: '',
				authdata: '',
				isLoggedIn: false
			};
		}
		
		function encrypt64(username, password) {
			return $base64.encode(username + ':' + password);
		}
	}
})();
