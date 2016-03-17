(function () {
	'use strict';

	angular
		.module('app.service')
		.factory('$global', global);

	global.$inject = [
						'$http',
						'$base64',
						'$q',
						'$rootScope',
						'ApiService',
						'UserService'
					];

	/* @ngInject */
	function global($http, 
					$base64,
					$q, 
					$rootScope, 
					ApiService,
					UserService,
					$ionicLoading) {
		
		var suppFunction = [];
		
		$rootScope.currentUser = {
			username: '',
			authdata: '',
			monitoredStations: {},
			isLoggedIn: false
		};
		
		var service = {
			fetchSupport: fetchSupport,
			login: login,
			logout: logout,
			setCredentials: setCredentials,
			resetCredentials: resetCredentials,
			encrypt64: encrypt64
		};

		return service;

		////////////////
		
		function fetchSupport() {
			var defer = $q.defer();
			
			ApiService.supportedFunctions()
			.then(function (response) {
				defer.resolve(response.data);
			}, function (response) {
				defer.reject(response.data);
			});
						
			return defer.promise;
		}
				
		function login(username, password, callback) {		
			var defer = $q.defer();

			var authdata = $base64.encode(username + ':' + password);
			
			ApiService.restCall('Roles', authdata, '')
			.then(function (response) {
				setCredentials(username, authdata, response.data);
				defer.resolve(response.data);
			}, function (response) {
				defer.reject(response);
			});
			
			return defer.promise;
		}
		
		function logout() {
			var deferred = $q.defer();
			
			// Reset Credentials
			resetCredentials();
			
			ApiService.restCall('Roles', 'logout', '')
			.then(function (response) {
				deferred.resolve(response.data);
			}, function (response) {
				resetCredentials();
				deferred.reject(response);
			});
			
			return deferred.promise;
		}

		function setCredentials(username, authdata, roles) {
			UserService.createUser(username, authdata);
			UserService.setRoles(roles);
		}

		function resetCredentials() {
			UserService.resetUser();
		}
		
		function encrypt64(username, password) {
			return $base64.encode(username + ':' + password);
		}
	}
})();
