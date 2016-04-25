/* jshint -W117, -W030 */
describe('BagService:', function() {
	var BagService;

	beforeEach(module('app.bag'));

	beforeEach(inject(function (_BagService_, _$rootScope_) {
		BagService = _BagService_;
	}));	

	// TODO: The BagService be available
	it('should be available', inject(function(BagService) {
		expect(BagService).toBeDefined();
	}));
	
	// TODO: Should be able to get bag details
	it('should be able to get bag details', inject(function(BagService) {
		expect(BagService.getBag).toBeDefined();
	}));
	
	// TODO: Should be able to construct url parameters
	it('should be able to construct url parameters', inject(function(BagService) {
		
		var mockParameters =
		'&lpn=1234567890&station=Station&isLpnScanned=false&forceCreate=false&device=emulator';
		
		expect(BagService.createParams('1234567890', 'Station')).toBe(mockParameters);
	}));
	
});
