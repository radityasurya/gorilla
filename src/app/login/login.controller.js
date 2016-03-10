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

		vm.login = toast;
		vm.status = 'unloaded';
		
		vm.width = $window.innerWidth;
		vm.height = $window.innerHeight;
		
		vm.box = setup();
		
		activate();

		////////////////

		function activate() {
			// Fetch supportedFunctions from the server
			$global.fetchSupport().then(function (data) {
				$global.setSupport(data); // Set up on the global service
				console.log('fetched');
				vm.status = 'loaded!';
				vm.isError = false;
			}, function () {
				vm.error = 'Failed to load supported functions';
				vm.status = 'failed';
				vm.isError = true;
			});
			
		}
		
		function toast() {
			toaster.pop('error', 'title', 'text');
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
			});
		}
		
		function setup() {
			// calc height
			var width = ($window.innerHeight / 2) + 'px';
			return width;
		}

	}
})();
