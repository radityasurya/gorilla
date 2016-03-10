(function() {
    'use strict';

    angular
    .module('app.core', [
        /* Angular modules */
        // 'ngResource',
        'ngMessages',
		'ngCordova',
		'base64',

        /* Cross-app module */
        // 'my.appModule',
		'app.service'

        /* 3rd party modules */
        // 'firebase'
    ]);
})();
