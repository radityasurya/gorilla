(function () {
	'use strict';
	angular
		.module('app.bag')
		.factory('BagService', BagService);

	BagService.$inject = [
		'ApiService',
		'UserService',
		'$q',
		'$timeout'
	];

	/* @ngInject */
	function BagService(ApiService,
							UserService,
							$q,
							$timeout,
							$scope) {

		// Variable

		var service = {
			getBag: getBag
		};

		return service;

		////////////////
		
		function getBag(lpn, currentStation) {
			var defer = $q.defer();

			ApiService.restCall('Bag', UserService.getUser().auth, createParams(lpn, currentStation))
			.then(function (response) {
				defer.resolve(response.data);
			}, function (response) {
				console.log(response);
				defer.reject(response.data);
			});

			return defer.promise;
		}
		
		function createParams(lpn, currentStation) {
			var _url = '&lpn=' + lpn;
			_url += '&station=' + currentStation;
			_url += '&isLpnScaned=false&forceCreate=false&device=emulator'; 
			
			return _url;
		}
	}
})();
