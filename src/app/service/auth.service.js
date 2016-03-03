(function () {
	'use strict';

	angular
		.module('app')
		.service('AuthService', Service);

	Service.$inject = ['$q', '$http'];

	/* @ngInject */
	function Service($q, $http) {
		// VARIABLES
		var username = '';
		var isAuthenticated = false;
		var role = '';
		var authData = '';
		
		var service = {
			login: login,
			logout: logout,
			isAuthenticated: function() {return isAuthenticated;},
			username: function() {return username;}
		};
		
		return service;
		
		////////////////
		
		function login(username, password) {
			// Do login
		}
		
		function logout() {
			clearCredentials();
		}
		
		function loadCredentials() {
			// Get credentials from local storage
		}
		
		function storeCredentials() {
			// Store credentials to local storage
		}
		
		function setCredentials(auth) {
			username = auth.username;
			isAuthenticated = true;
			
			// Set header authorization
		}
		
		function clearCredentials() {
			authData = '';
			username = '';
			isAuthenticated = false;
			
			// Remove auth header
			// Remove local storage authdata
		}

	}
})();
