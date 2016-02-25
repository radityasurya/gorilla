(function () {
	'use strict';

	angular
		.module('app')
		.service('GlobalService', Service);

	Service.$inject = ['$http'];

	var baseUrl = 'http://172.21.27.17:7003/';

	/* @ngInject */
	function Service($http) {

		var service = {

		};
		return service;
		
		////////////////
	}
})();
