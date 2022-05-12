import { FormValidator } from 'rxcomp-form';

export default function RequiredIfValidator(condition) {
	return new FormValidator(function(value, params) {
		const condition = params.condition;
		if (!typeof condition === 'function') {
			return null;
		}
		if (Boolean(condition()) === true) {
			return (value == null || value.length === 0) ? { required: true } : null;
		} else {
			return null;
		}
	}, { condition });

	return new FormValidator_old((value) => {
		let field = null;
		if (typeof formGroup === 'function') {
			field = formGroup().get(fieldName);
		} else if (formGroup) {
			field = formGroup.get(fieldName);
		}
		// console.log('RequiredIfValidator', field.value, shouldBe != null ? field.value === shouldBe : field.value);
		return (!value && field && (shouldBe != null ? field.value === shouldBe : field.value)) ? { required: { value: value, requiredIf: fieldName } } : null;
	});
}
