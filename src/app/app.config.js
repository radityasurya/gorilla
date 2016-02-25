(function() {
    'use strict';

    angular
    .module('app')
    .config(configure);

    configure.$inject = ['$ionicConfigProvider'];

    function configure ($ionicConfigProvider) {
        // Add your configuration here
        $ionicConfigProvider.navBar.alignTitle('center');       // Center title in IOS, ANDROID, WINDOWS PHONE
    }

})();
