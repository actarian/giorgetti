import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import { GtmService } from '../../common/gtm/gtm.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import { CareersService } from './careers.service';

export class CareersComponent extends Component {

	onInit() {
		this.error = null;
		this.success = false;
		const form = this.form = new FormGroup({
			firstName: new FormControl(null, [Validators.RequiredValidator()]),
			lastName: new FormControl(null, [Validators.RequiredValidator()]),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			telephone: new FormControl(null),
			country: new FormControl(null, [Validators.RequiredValidator()]),
			city: new FormControl(null, [Validators.RequiredValidator()]),
			domain: new FormControl(null, [Validators.RequiredValidator()]),
			cv: new FormControl(null),
			message: new FormControl(null),
			privacy: new FormControl(null, [Validators.RequiredValidator()]),
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
		return CareersService.data$().pipe(
			tap(data => {
				const controls = this.controls;
				controls.country.options = FormService.toSelectOptions(data.country.options);
				controls.domain.options = FormService.toSelectOptions(data.domain.options);
				this.pushChanges();
			})
		);
	}

	test() {
		const form = this.form;
		const controls = this.controls;
		const country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
		const domain = controls.domain.options.length > 1 ? controls.domain.options[1].id : null;
		form.patch({
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			telephone: '0721 411112',
			country: country,
			city: 'Pesaro',
			domain: domain,
			message: 'Hi!',
			privacy: true,
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
		console.log('CareersComponent.onSubmit', form.value);
		// console.log('CareersComponent.onSubmit', 'form.valid', valid);
		if (form.valid) {
			// console.log('CareersComponent.onSubmit', form.value);
			form.submitted = true;
			CareersService.submit$(form.value).pipe(
				first(),
			).subscribe(_ => {
				this.success = true;
				form.reset();
				GtmService.push({
					'event': "Careers",
					'form_name': "Lavora con noi"
				});
			}, error => {
				console.log('CareersComponent.error', error);
				this.error = error;
				this.pushChanges();
				LocomotiveScrollService.update();
			});
		} else {
			form.touched = true;
		}
	}

}

CareersComponent.meta = {
	selector: '[careers]',
};
