/* jshint -W117, -W030 */
describe('ApiService:', function() {
	var ApiService;
	
	// Load the module for the service
	beforeEach(module('app.service'));
	
	// Instantiate the service
	beforeEach(inject(function (_ApiService_) {
		ApiService = _ApiService_;
	}));
	
	// TODO: The ApiService be available
	it('should be available', inject(function(ApiService) {
		expect(ApiService).toBeDefined();
	}));
	
	// TODO: Check the base url
	it('Should have default BASE URL', inject(function(ApiService) {
		expect(ApiService.getURL()).toEqual('http://172.19.18.225');
	}));
	
	// TODO: Check the maximum timeout for http request is 5000
	it('Maximum timeout for every request is 5000', inject(function(ApiService) {
		expect(ApiService.getTimeout()).toEqual(5000);
	}));
	
	// TODO: Should be able to set new timeout
	it('Shoud be able to set new timeout', inject(function(ApiService) {
		spyOn(ApiService, 'getTimeout').and.callThrough();
		ApiService.setTimeout(3000);
		expect(ApiService.getTimeout()).toEqual(3000);
	}));
	
	// TODO: Should be able to get and set SupportedFunctions
	it('Should be able to get and set SupportedFunctions',
		inject(function(ApiService) {

		var data = {
			Bag: {
				uri: '/mttws/query/Bag',
				method: 'GET',
				allowedRoles: 'QUERYBAG'
			}
		};

		spyOn(ApiService, 'getSupportedFunctions').and.callThrough();

		ApiService.setSupportedFunctions(data);
		expect(ApiService.getSupportedFunctions())
			.toEqual(data);

	}));
	
	// TODO: Should be able to get URL from supportedFunctions
	it('Should be able to get URL using Name from supportedFunctions',
	inject(function(ApiService) {
		
		var data = {
			Bag: {
				uri: '/mttws/query/Bag',
				method: 'GET',
				allowedRoles: 'QUERYBAG'
			}
		};
			
		spyOn(ApiService, 'getURI').and.callThrough();
		
		ApiService.setSupportedFunctions(data);
		expect(ApiService.getURI('Bag'))
			.toEqual('http://172.19.18.225/mttws/query/Bag');
		
	}));
	
	// TODO: Should be able to get Method using Name from supportedFunctions
	it('Should be able to get Method using Name from supportedFunctions',
		inject(function(ApiService) {

		var data = {
			Bag: {
				uri: '/mttws/query/Bag',
				method: 'GET',
				allowedRoles: 'QUERYBAG'
			}
		};

		spyOn(ApiService, 'getMethod').and.callThrough();

		ApiService.setSupportedFunctions(data);
		expect(ApiService.getMethod('Bag'))
			.toEqual('GET');

	}));
	
});
