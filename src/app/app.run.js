(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = [
						'$ionicPlatform',
						'$timeout',
						'$global',
						'$cordovaSplashscreen',
						'$cordovaStatusbar',
						'$rootScope', '$ionicLoading',
						'$state', '$ionicPopup'
						];

	function runBlock(
	$ionicPlatform,
		$timeout,
		$global, 
		$cordovaSplashscreen, 
		$cordovaStatusbar,
		$rootScope, $ionicLoading,
		$state, $ionicPopup)
	{
		$ionicPlatform.ready(function () {
			// Splash Screen
			$timeout(function () {
				$cordovaSplashscreen.hide();
			}, 100);
			
			// Hide the accessory bar by default (remove this to show the accessory bar
			// above the keyboard for form inputs)
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
			
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				
			});
			
			// Keyboard Fix
			window.addEventListener('native.keyboardhide', keyboardHideHandler);
			function keyboardHideHandler(e) {
				window.scrollTo(0,0);
			}
			document.addEventListener('focusout', function(e) {window.scrollTo(0, 0);});
			
			// Back Button
			$ionicPlatform.registerBackButtonAction(function (event) {
				if ($state.current.name === 'login') {
					$ionicPopup.confirm({
						title: 'Exit',
						template: 'Are you sure you want to exit?'
					}).then(function(res) {
						if (res) {
							navigator.app.exitApp();
						}
					});
				} else if ($state.current.name === 'station') {
					$ionicPopup.confirm({
						title: 'Logout',
						template: 'Are you sure you want to logout?'
					}).then(function(res) {
						if (res) {
							$global.logout();
							$state.go('login');
						} else {
							console.log('do nothing');
						}
					});
				} else if ($state.current.name === 'station-monitor') {
					$ionicPopup.confirm({
						title: 'Logout',
						template: 'Are you sure you want to logout?'
					}).then(function(res) {
						if (res) {
							$global.logout();
							$state.go('login');
						} else {
							console.log('do nothing');
						}
					});

				} else {
					navigator.app.backHistory();
				}
			}, 100);
			
		});
		
		$rootScope.$on('loading:show', function() {
			$ionicLoading.show({
				template: '<ion-spinner icon="lines" style="stroke: #F17B21; fill: #F17B21"></ion-spinner>',
				showBackdrop: true,
				duration: 5000
			});
		});

		$rootScope.$on('loading:hide', function() {
			$ionicLoading.hide();
		});

	}
})();
