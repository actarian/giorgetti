import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import { GtmService } from '../../common/gtm/gtm.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import RequiredIfValidator from '../../controls/required-if.validator';
import { ProductsDetailService } from './products-detail.service';

export class ProductsDetailRequestComponent extends Component {

	onInit() {
		console.log('ProductsDetailRequestComponent', this.product);
		this.response = null;
		this.error = null;
		this.success = false;
		const hasNewsletter = RequiredIfValidator(() => Boolean(this.form.value.newsletter));
		const form = this.form = new FormGroup({
			productId: new FormControl(this.product.id, [Validators.RequiredValidator()]),
			productTitle: new FormControl(this.product.title, [Validators.RequiredValidator()]),
			reason: new FormControl(null, [Validators.RequiredValidator()]),
			//
			firstName: new FormControl(null, [Validators.RequiredValidator()]),
			lastName: new FormControl(null, [Validators.RequiredValidator()]),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			telephone: new FormControl(null),
			company: new FormControl(null),
			occupation: new FormControl(null, [Validators.RequiredValidator()]),
			country: new FormControl(null, [Validators.RequiredValidator()]),
			city: new FormControl(null, [Validators.RequiredValidator()]),
			//
			message: new FormControl(null),
			//
			privacy: new FormControl(null, [Validators.RequiredTrueValidator()]),
			newsletter: new FormControl(null, [Validators.RequiredValidator()]),
			commercial: new FormControl(null, [Validators.RequiredValidator()]),
			promotion: new FormControl(null, [Validators.RequiredValidator()]),
			// newsletterLanguage: new FormControl(null, [hasNewsletter]),
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
		return ProductsDetailService.data$().pipe(
			tap(data => {
				const controls = this.controls;
				controls.reason.options = FormService.toSelectOptions(data.reason.options);
				controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
				controls.country.options = FormService.toSelectOptions(data.country.options);
				// controls.newsletterLanguage.options = FormService.toSelectOptions(data.newsletterLanguage.options);
				this.pushChanges();
			})
		);
	}

	test() {
		const form = this.form;
		const controls = this.controls;
		const reason = controls.reason.options.length > 1 ? controls.reason.options[1].id : null;
		const occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
		const country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
		form.patch({
			reason: reason,
			firstName: 'Jhon',
			lastName: 'Appleseed',
			email: 'jhonappleseed@gmail.com',
			occupation: occupation,
			country: country,
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
		console.log('ProductsDetailRequestComponent.onSubmit', form.value);
		// console.log('ProductsDetailRequestComponent.onSubmit', 'form.valid', valid);
		if (form.valid) {
			// console.log('ProductsDetailRequestComponent.onSubmit', form.value);
			form.submitted = true;
			ProductsDetailService.submit$(form.value).pipe(
				first(),
			).subscribe(response => {
				this.response = response;
				this.success = true;
				form.reset();
				GtmService.push({
					'event': "ProductsDetailRequest",
					'form_name': "ProductsDetailRequest"
				});
			}, error => {
				console.log('ProductsDetailRequestComponent.error', error);
				this.error = error;
				this.pushChanges();
				LocomotiveScrollService.update();
			});
		} else {
			form.touched = true;
		}
	}

}

ProductsDetailRequestComponent.meta = {
	selector: '[products-detail-request]',
	inputs: ['product'],
};
