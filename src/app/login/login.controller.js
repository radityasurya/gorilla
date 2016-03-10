(function () {
	'use strict';

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$global', '$http', '$scope',
	'$state', '$ionicLoading', '$window', 'toaster'];

	/* @ngInject */
	function LoginController($global, $http, $scope, $state,
	$ionicLoading, $window, toaster) {
		var vm = this;

		vm.login = login;		
		vm.box = setup(vm.height);
		
		activate();

		////////////////

		function activate() {
			// Fetch supportedFunctions from the server
			$global.fetchSupport().then(function (data) {
				$global.setSupport(data); // Set up on the global service
				console.log('fetched');
				vm.status = 'loaded!';
				vm.isError = false;
				toast('success', 'Loaded', 'SupportedFunctions successfully loaded!', 1500);
			}, function () {
				vm.error = 'Failed to load supported functions';
				vm.status = 'failed';
				vm.isError = true;
				toast('error', 'Loading Error', 'Failed to load SupportedFunctions', 3000);
			});
			
		}
		
		function toast(type, title, text, timeout) {
			toaster.pop(type, title, text, timeout);
		}

		function login() {
			vm.dataLoading = true;
			console.log('User: ' + vm.username + ' Pass: ' + vm.password);
			$global.login(vm.username, vm.password).then(function (data) {
				console.log(data);
				$state.go('station');
			}, function (data) {
				vm.isError = true;
				vm.error = 'Wrong username or password';
				console.log(data.status);
				if (data.status === 0) {
					toast('error', 'Connection Error', 'Not connected to the server',3000);
				} else if (data.status === 401) {
					toast('error', 'Login Error', 'Wrong username or password',3000);
				}
			});
		}
		
		function setup(height) {
			// calc height
			var width = (height / 2) + 'px';
			return width;
		}

	}
})();
