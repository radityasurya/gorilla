(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['$ionicPlatform',
						'$cordovaSplashscreen',
						'$cordovaStatusbar',
						'$timeout',
						];

	function runBlock($ionicPlatform,
		$cordovaSplashscreen,
		$cordovaStatusbar,
		$timeout,
		$scope) 
	{
		$ionicPlatform.ready(function () {
			// Splash Screen
			$timeout(function () {
				$cordovaSplashscreen.hide();
			}, 100);
			
			// Style the status bar
			$cordovaStatusbar.styleHex('#F17B21'); //red
			
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
		});
	}
})();
