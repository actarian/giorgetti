import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';
import { SessionStorageService } from '../../common/storage/session-storage.service';
import { environment } from '../../environment';

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
		if (environment.flags.production) {
			return ApiService.get$('/user/data.json');
		} else {
			return ApiService.get$('/user/data.json');
		}
	}

	static forgot$(payload) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$(`/user/forgot.json`, payload);
		} else {
			return ApiService.get$(`/user/forgot.json`);
		}
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
			return (
				environment.flags.production ?
					ApiService.get$(`/user/me.json`) :
					ApiService.get$(`/user/me.json`)
			).pipe(
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
		return (
			environment.flags.production ?
				// !!! convert to .post$
				ApiService.get$(`/user/signin.json`, payload) :
				ApiService.get$(`/user/signin.json`)
		).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static signout$() {
		return (
			environment.flags.production ?
				ApiService.get$(`/user/signout.json`) :
				ApiService.get$(`/user/signout.json`)
		).pipe(
			tap((_) => this.setUser(null)),
		);
	}

	static signup$(payload) {
		return (
			environment.flags.production ?
				// !!! convert to .post$
				ApiService.get$(`/user/signup.json`, payload) :
				ApiService.get$(`/user/signup.json`)
		).pipe(
			map((response) => this.mapUser(response)),
			tap((user) => this.setUser(user)),
		);
	}

	static tryFacebook$(me) {
		return of(null);
	}

	static tryGoogle$(me) {
		return of(null);
	}

	static tryLinkedin$(me) {
		return of(null);
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
