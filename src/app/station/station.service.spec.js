/* jshint -W117, -W030 */
describe('StationService:', function() {
	var StationService;
	
	beforeEach(module('app.station'));

	beforeEach(inject(function (_StationService_, _$rootScope_) {
		StationService = _StationService_;
	}));	

	// TODO: The UserService be available
	it('should be available', inject(function(StationService) {
		expect(StationService).toBeDefined();
	}));

	// TODO: Able to filter store stations
	// TODO: Able to construct parameter for BagsToProcess
});
