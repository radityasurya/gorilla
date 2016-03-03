(function () {
	'use strict';

	angular
		.module('app.station')
		.controller('StationController', StationController);

	StationController.$inject = ['$global'];

	/* @ngInject */
	function StationController($global) {
		var vm = this;
		vm.property = 'Controller';
		
		vm.logout = logout;
				
		activate();

		////////////////

		function activate() {
			vm.supportedFunctions = $global.getSupport();
		}
		
		function logout() {
			console.log('logout');
			$global.logout();
		}
	}
})();
