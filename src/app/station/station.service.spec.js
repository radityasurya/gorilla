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
	it('should be able to filter store stations', inject(function(StationService) {
		
		var mockStations = {
			'OOG CI HBS E':{
				'type': 'SCREENING'
			},
			'SOOG HBS':{
				'type': 'SCREENING'
			},
			'(S)OOG PBStore':{
				'type': 'Store'
			},
			'Lateral 17':{
				'type': 'Stillage'
			},
			'Pet Store':{
				'type': 'Store'
			},
		};
		
		var mockResults = [];
		mockResults.push({'stationName': '(S)OOG PBStore'});
		mockResults.push({'stationName': 'Pet Store'});
		
		spyOn(StationService, 'filterStoreStation').and.callThrough();

		expect(StationService.filterStoreStation(mockStations)).toEqual(mockResults);
	}));
	
	// TODO: Able to construct parameter for BagsToProcess
	it('should be able to construct parameter for BagsToProcess', inject(function(StationService) {

		var mockParams = '&station=OOG CI HBS E';
		mockParams += '&device=Emulator';
		mockParams += '&StoreStation[]=OOG Store&StoreStation[]=Pet Store';

		var mockMonitoredStations = [];
		mockMonitoredStations.push({'stationName': 'OOG Store'});
		mockMonitoredStations.push({'stationName': 'Pet Store'});

		spyOn(StationService, 'createParams').and.callThrough();

		expect(StationService
			.createParams('OOG CI HBS E',
							'Emulator',
							mockMonitoredStations))
			.toEqual(mockParams);
	}));
	
});
