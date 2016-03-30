/* jshint -W117, -W030 */
describe('StationController', function() {
	var controller, $global, scope, $state, $q;

	// Load the module for the account
	beforeEach(module('ngCordova'));
	beforeEach(module('toaster'));
	beforeEach(module('base64'));
	beforeEach(module('app.service'));
	beforeEach(module('app.station'));

	// Instantiate the controller and mocks for every test
	beforeEach(inject(function($rootScope, _$controller_, _$global_, _$q_) {
		scope = $rootScope.$new();
		$global = _$global_;
		$q = _$q_;
		controller = _$controller_('StationController as vm', {$scope: scope});
	}));

	// TODO: Should be able to check if the currentStation is exist
	
});
