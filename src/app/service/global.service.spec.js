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
	xit('Should be able to set supportedFunctions', inject(function($global) {
		
	}));
	
	// Check the getSupport is called
	xit('Should be able to get supportedFunctions', inject(function($global) {
		
	}));
	
	// Check the login user is setting the credentials
	// Check the logout user is clear the credentials
	
	// Check the setCredentials is updating the CurrentUser
	it('Should update CurrentUser when calling setCredentials', inject(function($global) {
		spyOn(scope, 'currentUser').and.callThrough();
		$global.setCredentials('test', 'test');
		expect(scope.currentUser.username).toBe('test');
	}));
	
	// Check the authdata making is base64
	
	// Check the resetCredentials is clearing the CurrentUser
	it('Should clear CurrentUser when calling resetCredentials', inject(function($global) {
		spyOn(scope, 'currentUser').and.callThrough();
		$global.resetCredentials();
		expect(scope.currentUser.username).toBe('');
	}));
	
});
