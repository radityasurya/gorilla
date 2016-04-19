/* jshint -W117, -W030 */

describe('BagDetailController:', function() {
	var controller, $global, scope, $state, $q, UserService, BagService, StationService;

	// Load the module for the account
	beforeEach(module('ngCordova'));
	beforeEach(module('toaster'));
	beforeEach(module('base64'));
	beforeEach(module('app.service'));
	beforeEach(module('app.station'));

	beforeEach(module('app.bag'));

	// Instantiate the controller and mocks for every test
	beforeEach(inject(function($rootScope, _$controller_, _$global_, _$q_, _UserService_, _BagService_, _StationService_) {
		scope = $rootScope.$new();
		$global = _$global_;
		$q = _$q_;
		UserService = _UserService_;
		BagService = _BagService_;
		StationService = _StationService_;
		controller = _$controller_('BagDetailController as vm', {$scope: scope});
	}));

	describe('Bag Detail Controller', function() {

		// TODO: The Station Controller should be available
		it('should be available', inject(function($controller, UserService, BagService, StationService) {
			expect(controller).toBeDefined();
		}));
	});

});
