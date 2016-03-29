(function (ionic) {
	'use strict';

	angular
		.module('app.barcode')
		.service('PopupService', PopupService);

	PopupService.$inject = [];

	/* @ngInject */
	function PopupService() {
		
		var currentPopup;
		var element = angular.element(document.querySelector('html'));
		element.on('click', function (event) {
			if (event.target.nodeName === 'HTML') {
				if (currentPopup) {
					currentPopup.close();
				}
			}
		});
		
		this.register = register;

		////////////////

		function register(popup) {
			currentPopup = popup;
		}
	}
})(window.ionic);
