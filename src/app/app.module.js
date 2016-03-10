(function() {
    'use strict';

    angular
    .module('app', [
        /* Shared modules */
        'ionic',
		'app.service',
        'app.core',

        /* Feature areas */
		'app.station',
		'app.login'

    ]);
})();
