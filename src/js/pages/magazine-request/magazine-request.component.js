import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import { GtmService } from '../../common/gtm/gtm.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import RequiredIfValidator from '../../controls/required-if.validator';
import { MagazineRequestService } from './magazine-request.service';

export class MagazineRequestComponent extends Component {

	onInit() {
		this.response = null;
		this.error = null;
		this.success = false;
		const form = this.form = new FormGroup({
			magazineId: this.magazineId,
			printedCopy: new FormControl(null, [Validators.RequiredValidator()]),
			//
			firstName: new FormControl(null, [Validators.RequiredValidator()]),
			lastName: new FormControl(null, [Validators.RequiredValidator()]),
			email: new FormControl(email, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			telephone: new FormControl(null),
			occupation: new FormControl(null, [Validators.RequiredValidator()]),
			country: new FormControl(null, [Validators.RequiredValidator()]),
			region: new FormControl(null, [new RequiredIfValidator('country', form, 114)]), // required if country === 114, Italy
			city: new FormControl(null, [Validators.RequiredValidator()]),
			//
			province: new FormControl(null, [new RequiredIfValidator('printedCopy', form, true)]),
			zipCode: new FormControl(null, [new RequiredIfValidator('printedCopy', form, true)]),
			address: new FormControl(null, [new RequiredIfValidator('printedCopy', form, true)]),
			streetNumber: new FormControl(null, [new RequiredIfValidator('printedCopy', form, true)]),
			//
			privacy: new FormControl(null, [Validators.RequiredTrueValidator()]),
			newsletter: new FormControl(null, [Validators.RequiredValidator()]),
			commercial: new FormControl(null, [Validators.RequiredValidator()]),
			promotion: new FormControl(null, [Validators.RequiredValidator()]),
			checkRequest: window.antiforgery,
			checkField: '',
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			this.pushChanges();
			LocomotiveScrollService.update();
		});
		this.load$().pipe(
			first(),
		).subscribe();
	}

	load$() {
		return MagazineRequestService.data$().pipe(
			tap(data => {
				const controls = this.controls;
				controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
				controls.country.options = FormService.toSelectOptions(data.country.options);
				controls.region.options = FormService.toSelectOptions(data.region.options);
				this.pushChanges();
			})
		);
	}

	test() {
		const form = this.form;
		const controls = this.controls;
		const occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
		const country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
		const region = controls.region.options.length > 1 ? controls.region.options[1].id : null;
		form.patch({
			printedCopy: false,
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			telephone: '0721 411112',
			occupation: occupation,
			country: country,
			region: region,
			city: 'Pesaro',
			privacy: true,
			newsletter: false,
			commercial: false,
			promotion: false,
			checkRequest: window.antiforgery,
			checkField: ''
		});
	}

	reset() {
		const form = this.form;
		form.reset();
	}

	onSubmit(model) {
		const form = this.form;
		console.log('MagazineRequestComponent.onSubmit', form.value);
		// console.log('MagazineRequestComponent.onSubmit', 'form.valid', valid);
		if (form.valid) {
			// console.log('MagazineRequestComponent.onSubmit', form.value);
			form.submitted = true;
			MagazineRequestService.submit$(form.value).pipe(
				first(),
			).subscribe(response => {
				this.response = response;
				this.success = true;
				form.reset();
				GtmService.push({
					'event': "MagazineRequest",
					'form_name': "MagazineRequest"
				});
			}, error => {
				console.log('MagazineRequestComponent.error', error);
				this.error = error;
				this.pushChanges();
				LocomotiveScrollService.update();
			});
		} else {
			form.touched = true;
		}
	}

}

MagazineRequestComponent.meta = {
	selector: '[magazine-request]',
	inputs: ['magazineId'],
};
