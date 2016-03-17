(function () {
	'use strict';
	angular
		.module('app.service')
		.factory('UserService', UserService);

	UserService.$inject = ['$http', '$q'];

	/* @ngInject */
	function UserService($http, $q) {

		// Variable
		var _baseUrl = 'http://172.19.18.225/mttws/';
		var _user = {
			username: '',
			auth: '',
			isLoggedIn: false,
			roles: {},
			monitoredStations: {}
		};

		var service = {
			createUser: createUser,
			getUser: getUser,
			resetUser: resetUser,
			setCurrentStation: setCurrentStation,
			getCurrentStation: getCurrentStation,
			setRoles: setRoles,
			getRoles: getRoles,
			setMonitoredStations: setMonitoredStations,
			getMonitoredStations: getMonitoredStations
		};

		return service;

		////////////////

		function createUser(uname, auth) {
			_user.username = uname;
			_user.auth = auth;
			_user.isLoggedIn = true;
		}
		
		function getUser() {
			return _user;
		}
		
		function resetUser() {
			_user.username = '';
			_user.auth = '';
			_user.isLoggedIn = false;
			_user.roles = {};
			_user.monitoredStations = {};
		}
		
		function setCurrentStation(selectedStation) {
			_user.currentStation = selectedStation.stationName;
		}
		
		function getCurrentStation() {
			return _user.currentStation;
		}
		
		function setRoles(rolesFromJson) {
			_user.roles = angular.copy(rolesFromJson);
		}
		
		function getRoles(rolesFromJson) {
			return _user.roles;
		}
		
		function setMonitoredStations(rolesFromJson) {
			_user.monitoredStations = angular.copy(rolesFromJson);
		}

		function getMonitoredStations(rolesFromJson) {
			return _user.monitoredStations;
		}

	}
})();
