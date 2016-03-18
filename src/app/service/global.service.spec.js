/* jshint -W117, -W030 */
describe('$global service:', function() {
	var $global, scope;

	beforeEach(module('base64'));
	beforeEach(module('app.service'));

	beforeEach(inject(function (_$global_, _$rootScope_) {
		$global = _$global_;
		scope = _$rootScope_.$new();
		scope = _$rootScope_;
	}));	
	
	// TODO: The Global Service be available
	it('Should be available', inject(function($global) {
		expect($global).toBeDefined();
	}));
	
	// Check the CurrentUser is exist
	it('CurrentUser should be available', inject(function($global) {
		expect(scope.currentUser).toBeDefined();
	}));
	
	// Check the setSupport is called
	it('Should be able fetch supportedFunctions', inject(function($global) {
		var temp = '{"Bag"}';
		spyOn($global, 'fetchSupport').and.callThrough();
		$global.fetchSupport();
		expect($global.fetchSupport).toHaveBeenCalled();
	}));
	
	// Check the login user is setting the credentials
	it('Should call setCredentials when login', inject(function($global) {
		spyOn($global, 'setCredentials');
		$global.login('test','test');
		expect($global.setCredentials).toBeDefined();
	}));
	
	// Check the logout user is clear the credentials
	it('Should call resetCredentials when logout', inject(function($global) {
		spyOn($global, 'resetCredentials');
		$global.logout();
		expect($global.resetCredentials).toBeDefined();
	}));
	
	// Check the authdata making is base64
	it('Should be able to encode authorization data with base64 encryption', inject(function($global) {
		var encoded = 'c3VwZXJtYW46U3VwZXJtYW4tMQ==';
		expect($global.encrypt64('superman', 'Superman-1')).toMatch(encoded);
	}));
	
	// Check the setCredentials is updating the CurrentUser
	xit('Should update CurrentUser when calling setCredentials', inject(function($global, $base64) {
		spyOn(scope, 'currentUser').and.callThrough();
		console.log($global.setCredentials('test', 'test'));
		expect(scope.currentUser.username).toBe('test');
	}));
	
	// Check the resetCredentials is clearing the CurrentUser
	xit('Should clear CurrentUser when calling resetCredentials', inject(function($global) {
		spyOn(scope, 'currentUser').and.callThrough();
		$global.resetCredentials();
		expect(scope.currentUser.username).toBeUndefined();
	}));
	
});
