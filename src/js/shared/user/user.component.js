import { Component } from 'rxcomp';
import { UserService, UserViews } from './user.service';

export class UserComponent extends Component {

	onInit() {
		this.views = UserViews;
		this.view = this.view || UserViews.SIGN_UP;
	}

	setView(view) {
		this.view = view;
		this.pushChanges();
	}

	onViewForgot(event) {
		// console.log('UserComponent.onForgot');
		this.setView(UserViews.FORGOTTEN);
	}

	onViewSignIn(event) {
		// console.log('UserComponent.onSignIn');
		this.setView(UserViews.SIGN_IN);
	}

	onViewSignUp(event) {
		// console.log('UserComponent.onSignUp');
		this.setView(UserViews.SIGN_UP);
	}

	onSignIn(user) {
		console.log('UserComponent.onSignIn', user);
		UserService.setUser(user);
		if (this.navTo) {
			window.location.href = this.navTo;
		}
		// nav to profile
	}

	onSignUp(user) {
		console.log('UserComponent.onSignUp', user);
		UserService.setUser(user);
		if (this.navTo) {
			window.location.href = this.navTo;
		}
		// nav to profile
	}

	onForgot(email) {
		/*
		console.log('UserComponent.onForgot', email);
		this.setView(UserViews.SIGN_IN);
		*/
	}
}

UserComponent.meta = {
	selector: '[user]',
	inputs: ['navTo', 'view']
};
