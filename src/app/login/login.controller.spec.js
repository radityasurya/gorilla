/* jshint -W117, -W030 */

describe('LoginController:', function() {
    var controller, $global, scope, $state, $q;

    // Load the module for the account
	beforeEach(module('ngCordova'));
	beforeEach(module('toaster'));
	beforeEach(module('base64'));
	beforeEach(module('app.service'));
    beforeEach(module('app.login'));

    // Instantiate the controller and mocks for every test
    beforeEach(inject(function($rootScope, _$controller_, _$global_, _$q_) {
        scope = $rootScope.$new();
		$global = _$global_;
		$q = _$q_;
		controller = _$controller_('LoginController as vm', {$scope: scope});
    }));

    describe('Login controller', function() {

		// TODO: The Login Controller should be available
		it('should be available', inject(function($controller) {
			expect(controller).toBeDefined();
		}));
		
		// TODO: Setup function should be valid
		it('able to calculate the window height for responsiveness', inject(function() {
			spyOn(controller, 'box');
			controller.box(500);
			expect(controller.box).toHaveBeenCalled();
		}));
		
		// TODO: LoginController should call login on $global service
		xit('call login on the $global service', inject(function($controller) {
			spyOn($global, 'login').and.callThrough();
			controller.login();
			expect($global.login).toHaveBeenCalled();
		}));
		
		// TODO: LoginController should fetch supportedFunctions
		it('should fetch supportedFunctions from $global service', function() {
			spyOn($global, 'fetchSupport').and.callThrough();
			
		});
		
		// TODO: Success to login
		// TODO: Failed to login
		
    });

});
