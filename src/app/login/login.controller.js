(function () {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$global', '$http', '$scope', '$state'];

	/* @ngInject */
	function LoginController($global, $http, $scope, $state) {
		var vm = this;

		vm.login = login;
		vm.berhasil = 'hasil';

		activate();

		////////////////

		function activate() {
			// Fetch supportedFunctions from the server
			$global.fetchSupport().then(function (data) {
				$global.setSupport(data); // Set up on the global service
				vm.status = 'loaded!';
			}, function () {
				vm.error = 'error';
				vm.status = 'failed';
			});
		}

		function login() {
			vm.dataLoading = true;
			console.log('User: ' + vm.username + ' Pass: ' + vm.password);
			$global.login(vm.username, vm.password).then(function (data) {
				console.log(data);
				$state.go('station');
			}, function (data) {
				console.log(data.status);
			});
		}

	}
})();
