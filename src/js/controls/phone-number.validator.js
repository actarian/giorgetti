import { FormValidator } from 'rxcomp-form';

/**
 * a phone number pattern validator
 */
export function PhoneNumberValidator() {
	const regex = /^(\+\d{1,2}){1}[\s|-]?[(]?(\d+)[\)]?[\s|-]?(\d+)?$/;
	return new FormValidator(function(value, params) {
		if (!value) {
			return null;
		}
		return regex.test(value) ? null : { phoneNumber: true };
	});
}
