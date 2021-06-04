import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';
import { SessionStorageService } from '../../common/storage/session-storage.service';

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
		if (user) {
			SessionStorageService.set('user', user);
		} else {
			SessionStorageService.delete('user');
		}
		this.user$_.next(user);
	}

	static data$() {
		return ApiService.get$('/user/data.json');
	}

	static forgot$(payload) {
		return ApiService.get$(`/user/forgot.json`, payload);
	}

	static me$() {
		const sessionUser = SessionStorageService.get('user');
		if (sessionUser) {
			return of(sessionUser).pipe(
				switchMap(user => {
					this.setUser(new User(user));
					return this.user$_;
				})
			);
		} else {
			return ApiService.get$(`/user/me.json`).pipe(
				map((response) => {
					this.mapUser(response);
				}),
				catchError(_ => of(null)),
				switchMap(user => {
					this.setUser(user);
					return this.user$_;
				}),
				map(user => user || null),
			);
		}
	}

	static signin$(payload) {
		return ApiService.get$(`/user/signin.json`, payload).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static signout$() {
		return ApiService.get$(`/user/signout.json`).pipe(
			tap((_) => this.setUser(null)),
		);
	}

	static signup$(payload) {
		return ApiService.get$(`/user/signup.json`, payload).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static sessionStorage$() {
		return of(SessionStorageService.get('user') || null);
	}

	static mapUser(user) {
		return user ? new User(user) : null;
	}

	static mapUsers(users) {
		return users ? users.map(x => UserService.mapUser(x)) : [];
	}

}
