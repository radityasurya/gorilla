/* jshint -W117, -W030 */
describe('ApiService', function() {
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
		expect(ApiService.baseUrl()).toEqual('http://172.19.18.225/mttws/');
	}));
});
