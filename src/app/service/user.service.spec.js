/* jshint -W117, -W030 */
describe('UserService:', function() {
	var UserService, scope;

	beforeEach(module('base64'));
	beforeEach(module('app.service'));

	beforeEach(inject(function (_UserService_, _$rootScope_) {
		UserService = _UserService_;
		scope = _$rootScope_.$new();
		scope = _$rootScope_;
	}));	

	// TODO: The UserService be available
	it('should be available', inject(function(UserService) {
		expect(UserService).toBeDefined();
	}));

	// TODO: Should be able to create User
	it('Should be able to create User', inject(function(UserService) {
		
		var mockUser = {
			username: 'test',
			auth: 'test',
			isLoggedIn: true,
			roles: {},
			monitoredStations: [],
			currentStation: 'default'
		};

		spyOn(UserService, 'getUser').and.callThrough();
		UserService.createUser('test', 'test');
		expect(UserService.getUser()).toEqual(mockUser);
		
	}));
	
	// TODO: Should be able to reset User
	it('Should be able to reset User', inject(function(UserService) {

		var mockUser = {
			username: '',
			auth: '',
			isLoggedIn: false,
			roles: {},
			monitoredStations: [],
			currentStation: 'default'
		};

		spyOn(UserService, 'getUser').and.callThrough();
		UserService.resetUser();
		expect(UserService.getUser()).toEqual(mockUser);

	}));
	
	// TODO: Should be able to get and set current station
	xit('Should be able to get and set current station',
		inject(function(UserService) {

		var mockStation = {stationName: 'station'};
		
		spyOn(UserService, 'getCurrentStation').and.callThrough();
		UserService.createUser('test','test');
		UserService.setCurrentStation(mockStation);
		
		expect(UserService.getCurrentStation()).toEqual(mockStation.stationName);

	}));
	
	// TODO: Should be able to get and set roles
	it('Should be able to get and set roles',
		inject(function(UserService) {

		var mockRoles = {
			'QUERYBAG':{
				'AllowedStationType':[
					'SCREENING',
					'STILLAGE',
					'STORE',
					'TRACKING'
				]
			},
			'DELIVER':{
				'AllowedStationType':[
					'STILLAGE'
				]
			},
			'RELEASE':{
				'AllowedStationType':[
					'STORE'
				]
			},
			'STORE':{
				'AllowedStationType':[
					'STORE'
				]
			}
		};

		spyOn(UserService, 'getRoles').and.callThrough();
		UserService.createUser('test','test');
		UserService.setRoles(mockRoles);

		expect(UserService.getRoles()).toEqual(mockRoles);

	}));
	
	// TODO: Should be able to get and set monitored stations
	it('hould be able to get and set monitored stations',
		inject(function(UserService) {

		var mockMonitoredStations = {
			'OOG CI HBS E': {
				'type':'Screening',
				'locations':[
				],
				'allowedClassification':false
			}
		};

		spyOn(UserService, 'getMonitoredStations').and.callThrough();
		UserService.createUser('test','test');
		UserService.setMonitoredStations(mockMonitoredStations);

		expect(UserService.getMonitoredStations()).toEqual(mockMonitoredStations);

	}));

});
