/* jshint -W117, -W030 */

describe('LoginController', function() {
    var $controller;

    // Load the module for the account
	beforeEach(module('toaster'));
	beforeEach(module('base64'));
	beforeEach(module('app.service'));
    beforeEach(module('app.login'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function(_$controller_) {
        var $scope = {};
		$controller = _$controller_('LoginController', {$scope: $scope});
    }));

    describe('Login controller', function() {

		// TODO: The Login Controller should be available
		it('should be available', inject(function($controller) {
			expect($controller).toBeDefined();
		}));
		
		// TODO: Setup function should be valid
		it('calculate the window height for responsiveness', inject(function($controller) {
			// expect($controller.vm.box(500)).toBeEqualTo(250);
		}))
		// TODO: LoginController should call login on $global service
		
		
		// TODO: Success fetch supportedFunctions
		// TODO: Fail to fetch supportedFunctions
		// TODO: Success to login
		// TODO: Failed to login
		
    });

});
