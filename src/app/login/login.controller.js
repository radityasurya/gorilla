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
				toast('success', 'Loaded', 'SupportedFunctions successfully loaded!', 2000);
			}, function (data) {
				console.log(data);
				toast('error', 'Loading Error', 'Failed to load SupportedFunctions', 5000);
			});
			
		}
		
		function toast(type, title, text, timeout) {
			toaster.pop(type, title, text, timeout);
		}

		function login() {
			if ($window.cordova &&
				$window.cordova.plugins) {
				cordova.plugins.Keyboard.close();
			}
			window.scrollTo(0,0);

			$global.login(vm.username, vm.password)
			.then(function (data) {
				$state.go('station');
			}, function (data) {
				if (data.status === 0) {
					toast('error', 'Connection Error', 'Not connected to the server',5000);
				} else if (data.status === 401) {
					toast('error', 'Login Error', 'Wrong username or password',5000);
				}
			});
		}
		
		function setup(height) {
			// calc height
			var temp = (height / 2) + 'px';
			
			if (height === 0) {
				return 305;
			}
			return temp;
		}

	}
})();
