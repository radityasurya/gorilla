/* jshint -W117, -W030 */

describe('LoginController', function() {
	var $global, httpBackend;
    var $controller;

    // Load the module for the account
	beforeEach(module('app.service'));
    beforeEach(module('app.login'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function(_$global_,_$controller_, $httpBackend) {
		var $global = _$global_;
		httpBackend = $httpBackend;
        var $scope = {};
		$controller = _$controller_('LoginController', {$scope: $scope});
    }));

    describe('Login controller', function() {

		// TODO: Controller should be created successfully
		/* it ('should be created successully', function() {
            expect($controller).toBeDefined();
        });*/
		
		// TODO: Success fetch supportedFunctions
		// TODO: Fail to fetch supportedFunctions
		// TODO: Success to login
		// TODO: Failed to login
		
    });

});
