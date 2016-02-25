(function () {
	'use strict';

	angular
		.module('app')
		.run(runBlock);

	runBlock.$inject = ['$ionicPlatform',
						'$cordovaSplashscreen',
						'$timeout',
						'GlobalFactory'];

	function runBlock($ionicPlatform,
		$cordovaSplashscreen,
		$timeout,
		GlobalFactory, $scope) {
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
			
			console.log('get the supported functions');
						
			activate();
			
			////////////

			function activate() {
				return getSupportedFunctions().then(function () {
					console.log('Supported function loaded!');
				});
			}

			function getSupportedFunctions() {
				return GlobalFactory.getSupportedFunctions()
					.then(function (data) {
						console.log(data);
					});
			}
		});
	}
})();
