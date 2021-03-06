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
			monitoredStations: [],
			currentStation: {},
		};
		
		_user.currentStation.stationName = 'default';
		//_user.currentStation.locations = ['PB Store 2', 'PB Store 1', 'PB Store 3'];

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

		/**
		 * Create new User object
		 * @param {string} uname Username
		 * @param {sting}  auth  Basic Authentication data
		 */
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
			_user.monitoredStations = [];
			_user.currentStation = {};
			_user.currentStation.stationName = 'default';
			_user.currentStation.location = {};
		}

		function setCurrentStation(stationName, stationType, locations) {
			console.log(locations);
			_user.currentStation.stationName = stationName;
			_user.currentStation.stationType = stationType;
			_user.currentStation.locations = ['PB Store 2', 'PB Store 1', 'PB Store 3'];
			//_user.currentStations.locations = ['PB Store 2', 'PB Store 1', 'PB Store 3'];
		}

		function getCurrentStation() {
			return _user.currentStation;
		}

		function setRoles(rolesFromJson) {
			_user.roles = angular.copy(rolesFromJson);
		}

		function getRoles() {
			return _user.roles;
		}

		function setMonitoredStations(monitoredStations) {
			_user.monitoredStations = monitoredStations;
		}

		function getMonitoredStations() {	
			return _user.monitoredStations;
		}

	}
})();
