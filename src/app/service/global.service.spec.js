/* jshint -W117, -W030 */
describe('$global', function() {
	var $global;

	beforeEach(module('base64'));
	beforeEach(module('app.service'));

	beforeEach(inject(function (_$global_) {
		$global = _$global_;
	}));	
	
	// TODO: The Global Service be available
	it('Service should be available', inject(function($global) {
		expect($global).toBeDefined();
	}));
	
});
