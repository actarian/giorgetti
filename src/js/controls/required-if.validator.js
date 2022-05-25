import { FormValidator } from 'rxcomp-form';

export default function RequiredIfValidator(fieldName, formGroup, shouldBe) {

	return new FormValidator((value) => {
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
