import { FormValidator } from 'rxcomp-form';

/**
 * a required and true validator based on condition
 */
export default function RequiredTrueIfValidator(condition) {
	return new FormValidator(function(value, params) {
		const condition = params.condition;
		if (!typeof condition === 'function') {
			return null;
		}
		if (Boolean(condition()) === true) {
			return value === true ? null : { required: true };
		} else {
			return null;
		}
	}, { condition });
}
