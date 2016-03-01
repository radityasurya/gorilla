(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['$ionicPlatform',
						'$cordovaSplashscreen',
						'$timeout',
						];

	function runBlock($ionicPlatform,
		$cordovaSplashscreen,
		$timeout,
		$scope) 
	{
		$ionicPlatform.ready(function () {
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
				StatusBar.styleLightContent();
			}
		});
	}
})();
