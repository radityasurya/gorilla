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
	it('Base url is exist', inject(function(ApiService) {
		expect(ApiService.BASE_URL()).toEqual('http://172.19.18.225/mttws/');
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
});
