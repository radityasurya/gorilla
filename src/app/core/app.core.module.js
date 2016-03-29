(function() {
    'use strict';

    angular
    .module('app.core', [
        /* Angular modules */
        // 'ngResource',
        'ngMessages',
		'ngAnimate',
		'ngCordova',
		'toaster',
		'base64',
		
        /* Cross-app module */
        // 'my.appModule',
		'app.service',
		'app.barcode'

        /* 3rd party modules */
        // 'firebase'
    ]);
})();
