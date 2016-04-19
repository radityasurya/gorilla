/* jshint -W117, -W030 */
describe('$global service:', function() {
	var $global, scope, $q;

	beforeEach(module('base64'));
	beforeEach(module('app.service'));

	beforeEach(inject(function (_$global_, _$rootScope_, _$q_, _UserService_) {
		$global = _$global_;
		scope = _$rootScope_.$new();
		scope = _$rootScope_;
		$q = _$q_;
		UserService = _UserService_;
	}));	
	
	// TODO: The Global Service be available
	it('Should be available', inject(function($global) {
		expect($global).toBeDefined();
	}));
	
	// TODO: Should have fetchSupport function
	it('Should have fetchSupport function', inject(function($global) {
		expect($global.fetchSupport).toBeDefined();
	}));
	
	// Check the setSupport is called
	it('Should be able to fetch supportedFunctions', inject(function($global) {
		var temp = '{"Bag"}';
		spyOn($global, 'fetchSupport').and.callThrough();
		$global.fetchSupport();
		expect($global.fetchSupport).toHaveBeenCalled();
	}));
	
	// Check the authdata making is base64
	it('Should be able to encode authorization data with base64 encryption', inject(function($global) {
		var encoded = 'c3VwZXJtYW46U3VwZXJtYW4tMQ==';
		expect($global.encrypt64('superman', 'Superman-1')).toMatch(encoded);
	}));

	// Check the setCredentials is updating the CurrentUser
	it('Should update CurrentUser when calling setCredentials', inject(function($global, $base64) {
		spyOn(UserService, 'getUser').and.callThrough();
		$global.setCredentials('test', 'test');
		expect(UserService.getUser().username).toBe('test');
	}));
	
	// Check the resetCredentials is clearing the CurrentUser
	it('Should clear CurrentUser when calling resetCredentials', inject(function($global) {
		spyOn(UserService, 'getUser').and.callThrough();
		$global.resetCredentials();
		expect(UserService.getUser().username).toBe('');
	}));
	
	// Check the login user is setting the credentials
	xit('Should call setCredentials when login', inject(function($global, $q) {
		spyOn($global.prototype, 'setCredentials')
			.and.callFake(function () {
			var deferred = $q.defer(); 
			return deferred.promise;
		});
		$global.login('test','test');
		expect($global.setCredentials).toHaveBeenCalled();
	}));
	
	// Check the logout user is clear the credentials
	xit('Should call resetCredentials when logout', inject(function($global) {
		spyOn($global, 'resetCredentials');
		$global.logout();
		expect($global.resetCredentials).toBeDefined();
	}));
});
