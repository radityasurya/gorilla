(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['$global', '$ionicPlatform',
						'$cordovaSplashscreen',
						'$cordovaStatusbar',
						'$timeout', '$location', '$rootScope',
						];

	function runBlock($global, $ionicPlatform,
		$cordovaSplashscreen,
		$cordovaStatusbar,
		$timeout, $location, $rootScope,
		$scope) 
	{
		$ionicPlatform.ready(function () {
			// Splash Screen
			$timeout(function () {
				$cordovaSplashscreen.hide();
			}, 100);
			
			// Style the status bar
			//$cordovaStatusbar.styleHex('#F17B21'); //red
			
			// Hide the accessory bar by default (remove this to show the accessory bar
			// above the keyboard for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleLightContent();
			}
			
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				console.log($rootScope.currentUser.isLoggedIn);
				// Check if the state.authrequired && service.isAuthenticared
				// If it isn't > $state.transition(login)
				// event.preventDefault();
				if ($location.path() !== '/login' && !$rootScope.currentUser.isLoggedIn) {
					console.log('not logged in!');
					console.log('redirect to login');
					$location.path('/login');
				}
			});
		});

	}
})();
