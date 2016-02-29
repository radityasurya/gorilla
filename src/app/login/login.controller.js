(function () {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['AuthService'];

	/* @ngInject */
	function LoginController(AuthService) {
		var vm = this;
		
		vm.login = login;

		activate();
		
		////////////////

		function activate() {
			// Reset login status
			//AuthService.resetCredentials();
		}
		
		function login() {
			console.log('User: ' + vm.username + ' Pass: ' + vm.password);
			AuthService.login(vm.username, vm.password, function (response) {
				if (response.status == '200') {
					console.log('sukses cok');
					vm.berhasil = 'sukses boy';
				} else {
					console.log('gagal cok');
				}
			});
		}
	}
})();
