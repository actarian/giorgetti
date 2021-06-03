import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';

export const UserViews = {
	SIGN_IN: 1,
	SIGN_UP: 2,
	FORGOTTEN: 3,
};

export class User {
	get avatar() {
		return (this.firstName || '?').substr(0, 1).toUpperCase() + (this.lastName || '?').substr(0, 1).toUpperCase();
	}

	get fullName() {
		return this.firstName + ' ' + this.lastName;
	}

	constructor(data) {
		if (data) {
			Object.assign(this, data);
		}
	}
}

export class UserService {

	static user$_ = new BehaviorSubject(null);

	static get currentUser() {
		return this.user$_.getValue();
	}

	static setUser(user) {
		this.user$_.next(user);
	}

	static data$() {
		return ApiService.get$('/user/data.json');
	}

	static forgot$(payload) {
		return ApiService.post$(`/user/forgot.json`, payload);
	}

	static me$() {
		return ApiService.get$(`/user/me.json`).pipe(
			map((response) => this.mapUser(response)),
			catchError(_ => of(null)),
			switchMap(user => {
				this.setUser(user);
				return this.user$_;
			})
		);
	}

	static signin$(payload) {
		return ApiService.post$(`/user/signin.json`, payload).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static signout$() {
		return ApiService.post$(`/user/signout.json`).pipe(
			tap((_) => this.setUser(null)),
		);
	}

	static signup$(payload) {
		return ApiService.post$(`/user/signup.json`, payload).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static mapUser(user) {
		return new User(user);
	}

	static mapUsers(users) {
		return users ? users.map(x => UserService.mapUser(x)) : [];
	}

	/*
	static mapStatic__(user, isStatic, action = 'me') {
		if (!isStatic) {
			return user;
		};
		switch (action) {
			case 'me':
				if (!LocalStorageService.exist('user')) {
					user = null;
				};
				break;
			case 'register':
				LocalStorageService.set('user', user);
				break;
			case 'login':
				LocalStorageService.set('user', user);
				break;
			case 'logout':
				LocalStorageService.delete('user');
				break;
		}
		return user;
	}
	*/
}
