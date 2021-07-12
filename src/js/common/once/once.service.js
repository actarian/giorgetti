
import { from, fromEvent, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class OnceService {

	static uid = 0;
	static paths = [];

	static script(url, callback) {
		if (this.paths.indexOf(url) === -1) {
			this.paths.push(url);
			let callbackName;
			if (callback === true) {
				callbackName = 'OnceCallback' + (++this.uid);
				url = url.split('{{callback}}').join(callbackName);
			} else {
				callbackName = callback;
			}
			let callback$;
			const element = document.createElement('script');
			element.type = 'text/javascript';
			if (callback) {
				callback$ = from(
					new Promise((resolve, reject) => {
						window[callbackName] = function(data) {
							resolve(data);
						};
					})
				);
			} else {
				element.async = true;
				callback$ = fromEvent(element, 'load').pipe(
					map(x => x)
				);
			}
			const scripts = document.getElementsByTagName('script');
			if (scripts.length) {
				const script = scripts[scripts.length - 1];
				script.parentNode.insertBefore(element, script.nextSibling);
			}
			return of(true).pipe(
				switchMap(x => {
					element.src = url;
					return callback$;
				})
			);
		} else {
			return of(new Event('loaded!'));
		}
	}

}
