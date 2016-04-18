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
		
		// Variable
		var suppFunction = [];

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
		
		/**
		 * Fetching SupportedFunctions
		 * @returns {object} Promise
		 */
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
		
		/**
		 * Login functionalities
		 * @param   {string} username 
		 * @param   {string} password 
		 * @param   {object} callback 
		 * @returns {object} Promise
		 */
		function login(username, password, callback) {
			var defer = $q.defer();
			
			// Encode authorization data with base64
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
		
		/**
		 * Logout, by login with wrong credentials
		 * ex: logout:logout
		 * @returns {object} Promise
		 */
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
		
		/**
		 * Setting credentials
		 * @param {string} username 
		 * @param {string} authdata encrypted password with base64
		 * @param {Array}  roles    roles of the user
		 */
		function setCredentials(username, authdata, roles) {
			UserService.createUser(username, authdata);
			UserService.setRoles(roles);
		}
		
		/**
		 * Reset credentials
		 */
		function resetCredentials() {
			UserService.resetUser();
		}
		
		/**
		 * Base64 Encryptor
		 * @param   {string} username 
		 * @param   {string} password 
		 * @returns {string} Encoded username:password	
		 */
		function encrypt64(username, password) {
			return $base64.encode(username + ':' + password);
		}
	}
})();
