(function () {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$global', '$http', '$scope'];

	/* @ngInject */
	function LoginController($global, $http, $scope) {
		var vm = this;

		vm.login = login;
		vm.berhasil = 'hasil';

		activate();

		////////////////

		function activate() {
			// Fetch supportedFunctions from the server
			$global.fetchSupport().then(function (data) {
				$global.setSupport(data); // Set up on the global service
			}, function () {
				vm.error = 'error';
			});
		}

		function login() {
			console.log('User: ' + vm.username + ' Pass: ' + vm.password);
			$global.login(vm.username, vm.password, function (response) {
				if (response.status == '200') {
					console.log('sukses cok');
					vm.status = 'Success ' + response.data;
				} else {
					console.log('gagal cok');
					vm.status = 'Failed';
				}
			});
		}

	}
})();
