/* jshint -W117, -W030 */
describe('$global:', function() {
	var $global;

	beforeEach(module('base64'));
	beforeEach(module('app.service'));

	beforeEach(inject(function (_$global_) {
		$global = _$global_;
	}));	
	
	// TODO: The Global Service be available
	it('$global Service should be available', inject(function($global) {
		expect($global).toBeDefined();
	}));
	
	// Check the CurrentUser is exist
	// Check the setSupport is called
	// Check the getSupport is called
	// Check the login user is setting the credentials
	// Check the logout user is clear the credentials
	// Check the setCredentials is updating the CurrentUser
	// Check the authdata making is base64
	// Check the resetCredentials is clearing the CurrentUser
	
	
});
