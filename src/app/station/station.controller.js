(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationController', StationController);

	StationController.$inject = ['$global', '$state', '$rootScope'];

	/* @ngInject */
	function StationController($global, $state, $rootScope) {
		var vm = this;
		vm.property = 'Controller';
		
		vm.logout = logout;
				
		activate();

		////////////////

		function activate() {
			vm.supportedFunctions = $global.getSupport();
			vm.username = $rootScope.globals.currentUser.username;
		}
		
		function logout() {
			console.log('logout');
			$global.logout();
			$state.go('login');
		}
	}
})();
