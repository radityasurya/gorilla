(function() {
    'use strict';

    angular
    .module('app')
    .config(configure);

    configure.$inject = ['$ionicConfigProvider', '$httpProvider'];

    function configure ($ionicConfigProvider, $httpProvider) {
        // Add your configuration here
        $ionicConfigProvider.navBar.alignTitle('center');       // Center title in IOS, ANDROID, WINDOWS PHONE
		
		$ionicConfigProvider.scrolling.jsScrolling(false);
		
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
		$httpProvider.defaults.withCredentials = true;

		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		
		// $httpProvider.interceptors.push('AuthInterceptor');

    }

})();
