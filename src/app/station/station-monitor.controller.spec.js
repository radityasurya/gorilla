/* jshint -W117, -W030 */

describe('StationMonitorController:', function() {
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
		controller = _$controller_('StationMonitorController as vm', {$scope: scope});
	}));

	describe('Station Monitor Controller', function() {

		// TODO: The Station Controller should be available
		it('should be available', inject(function($controller) {
			expect(controller).toBeDefined();
		}));

		// Should be able to populate the view
		it('able to populate the view', inject(function() {
			expect(controller.storeStations).toBeDefined();
		}));
		
		// Should be able to select all item
		it('able to select all item', inject(function() {
			expect(controller.selectAll).toBeDefined();
		}));

		// Should be able to deselect all item
		it('able to deselect all item', inject(function() {
			expect(controller.deselectAll).toBeDefined();
		}));
	});

});
