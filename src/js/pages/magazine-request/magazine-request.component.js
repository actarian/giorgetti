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
		const isItaly = RequiredIfValidator(() => Boolean(this.form.value.country === 114));
		const hasPrintedCopy = RequiredIfValidator(() => Boolean(this.form.value.printedCopy));
		const form = this.form = new FormGroup({
			magazine: new FormControl(null, [Validators.RequiredValidator()]),
			//
			firstName: new FormControl(null, [Validators.RequiredValidator()]),
			lastName: new FormControl(null, [Validators.RequiredValidator()]),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			telephone: new FormControl(null),
			occupation: new FormControl(null, [Validators.RequiredValidator()]),
			country: new FormControl(null, [Validators.RequiredValidator()]),
			region: new FormControl(null, [isItaly]),
			//
			printedCopy: new FormControl(null),
			//
			city: new FormControl(null, [hasPrintedCopy]),
			province: new FormControl(null, [hasPrintedCopy]),
			zipCode: new FormControl(null, [hasPrintedCopy]),
			address: new FormControl(null, [hasPrintedCopy]),
			streetNumber: new FormControl(null, [hasPrintedCopy]),
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
				controls.magazine.options = FormService.toSelectOptions(data.magazine.options);
				controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
				controls.country.options = FormService.toSelectOptions(data.country.options);
				controls.region.options = FormService.toSelectOptions(data.region.options);
				controls.province.options = FormService.toSelectOptions(data.province.options);
				this.pushChanges();
			})
		);
	}

	test() {
		const form = this.form;
		const controls = this.controls;
		const magazine = controls.magazine.options.length > 1 ? controls.magazine.options[1].id : null;
		const occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
		const country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
		const region = controls.region.options.length > 1 ? controls.region.options[1].id : null;
		form.patch({
			magazine: magazine,
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			telephone: '0721 411112',
			occupation: occupation,
			country: country,
			region: region,
			printedCopy: false,
			city: null,
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

	onCountryDidChange() {
		console.log('MagazineRequestComponent.onCountryDidChange');
		this.controls.province.value = null;
	}

}

MagazineRequestComponent.meta = {
	selector: '[magazine-request]',
};
