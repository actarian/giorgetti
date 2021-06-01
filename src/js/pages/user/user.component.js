import { Component, getContext } from 'rxcomp';
import { UserService } from './user.service';

export const UserViews = {
	SIGN_IN: 1,
	SIGN_UP: 2,
	FORGOTTEN: 3,
};

export class UserComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		this.views = UserViews;
		this.view = this.view || UserViews.SIGN_IN;
	}

	onForgot(event) {
		// console.log('UserComponent.onForgot');
		this.view = UserViews.FORGOTTEN;
		this.pushChanges();
	}

	onLogin(event) {
		// console.log('UserComponent.onLogin');
		this.view = UserViews.SIGN_IN;
		this.pushChanges();
	}

	onRegister(event) {
		// console.log('UserComponent.onRegister');
		this.view = UserViews.SIGN_UP;
		this.pushChanges();
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

	onForgottenSent(email) {
		/*
		console.log('UserComponent.onForgottenSent', email);
		this.view = UserViews.SIGN_IN;
		this.pushChanges();
		*/
	}
}

UserComponent.meta = {
	selector: '[user]',
	inputs: ['navTo', 'view']
};
