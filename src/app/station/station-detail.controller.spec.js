/* jshint -W117, -W030 */

describe('StationDetailController:', function() {
	var controller, $global, scope, $state, $q, UserService, StationService;

	// Load the module for the account
	beforeEach(module('ngCordova'));
	beforeEach(module('toaster'));
	beforeEach(module('base64'));
	beforeEach(module('app.service'));
	beforeEach(module('app.station'));

	// Instantiate the controller and mocks for every test
	beforeEach(inject(function($rootScope, 
								_$controller_, 
								_$global_, 
								_$q_, 
								_UserService_, 
								_StationService_) {
		scope = $rootScope.$new();
		$global = _$global_;
		$q = _$q_;
		UserService = _UserService_;
		StationService = _StationService_;
		controller = _$controller_('StationDetailController as vm', {$scope: scope});
	}));

	describe('Station Controller', function() {

		// TODO: The Station Controller should be available
		it('should be available', inject(function($controller) {
			expect(controller).toBeDefined();
		}));

		// Should be able to set task description
		it('should be able to set task description and get preposition', inject(function($controller) {
			var mockResult = 'Deliver to 240';
			var mockBag = {'taskDescription': 'Deliver', 'taskDestinations': '240'};
			
			expect(controller.setTaskDescription(mockBag)).toBe(mockResult);
		
		}));

	});

});
