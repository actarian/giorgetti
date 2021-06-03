import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { first, takeUntil, tap } from 'rxjs/operators';
import { FormService } from '../../core/forms/form.service';
import MatchValidator from '../../core/forms/match.validator';
import RequiredIfValidator from '../../core/forms/required-if.validator';
import { GtmService } from '../../core/gtm/gtm.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { UserService } from './user.service';

export class UserSignupComponent extends Component {

	onInit() {
		this.error = null;
		this.success = false;
		const form = this.form = new FormGroup({
			firstName: new FormControl(null, [Validators.RequiredValidator()]),
			lastName: new FormControl(null, [Validators.RequiredValidator()]),
			country: new FormControl(null, [Validators.RequiredValidator()]),
			city: new FormControl(null, [Validators.RequiredValidator()]),
			company: new FormControl(null),
			occupation: new FormControl(null, [Validators.RequiredValidator()]),
			email: new FormControl(null, [Validators.RequiredValidator(), Validators.EmailValidator()]),
			password: new FormControl(null, [Validators.RequiredValidator()]),
			passwordConfirm: new FormControl(null, [Validators.RequiredValidator(), MatchValidator('password', form)]),
			privacy: new FormControl(null, [Validators.RequiredValidator()]),
			newsletter: new FormControl(null),
			newsletterLanguage: new FormControl(null, [RequiredIfValidator('newsletter', form)]),
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
			takeUntil(this.unsubscribe$)
		).subscribe();
	}

	load$() {
		return UserService.data$().pipe(
			tap(data => {
				const controls = this.controls;
				controls.country.options = FormService.toSelectOptions(data.country.options);
				controls.occupation.options = FormService.toSelectOptions(data.occupation.options);
				controls.newsletterLanguage.options = FormService.toSelectOptions(data.newsletterLanguage.options);
				this.pushChanges();
			})
		);
	}

	test() {
		const form = this.form;
		const controls = this.controls;
		const country = controls.country.options.length > 1 ? controls.country.options[1].id : null;
		const occupation = controls.occupation.options.length > 1 ? controls.occupation.options[1].id : null;
		form.patch({
			firstName: 'Jhon',
			lastName: 'Appleseed',
			country: country,
			city: 'Pesaro',
			company: 'Websolute',
			occupation: occupation,
			email: 'jhonappleseed@gmail.com',
			password: '********',
			passwordConfirm: '********',
			privacy: true,
		});
	}

	reset() {
		const form = this.form;
		form.reset();
	}

	onSubmit() {
		const form = this.form;
		console.log('UserSignupComponent.onSubmit', form.value);
		if (form.valid) {
			form.submitted = true;
			UserService.signup$(form.value).pipe(
				first(),
			).subscribe(response => {
				console.log('UserSignupComponent.onSubmit', response);
				this.success = true;
				GtmService.push({
					'event': "Registration",
					'form_name': "Registrazione"
				});
				form.reset();
				this.signUp.next(response);
			}, error => {
				console.log('UserSignupComponent.error', error);
				this.error = error;
				form.submitted = false;
				this.pushChanges();
				LocomotiveScrollService.update();
			});
		} else {
			form.touched = true;
		}
	}

	onSignIn() {
		this.viewSignIn.next();
	}
}

UserSignupComponent.meta = {
	selector: '[user-signup]',
	outputs: ['signUp', 'viewSignIn'],
};
