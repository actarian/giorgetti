import { fromEvent, ReplaySubject } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

export class LocomotiveScrollService {

	static scroll$ = new ReplaySubject(1);
	static scroll(scroll) {
		// console.log('LocomotiveScrollService.scroll', scroll);
		this.scroll$.next(scroll);
	}

	static init(node, options) {
		options = Object.assign({
			useKeyboard: true,
			smoothMobile: true,
			inertia: 0.5,
			// name:'scroll',
			// offset: [0,0], // bottom top
			// repeat: false,
			smooth: true,
			// initPosition: { x: 0, y: 0 }
			// direction: 'vertical',
			lerp: 0.01,
			getDirection: true, // add direction to scroll event
			getSpeed: true, // add speed to scroll event
			// class: 'is-inview',
			initClass: 'has-scroll-init',
			scrollingClass: 'has-scroll-scrolling',
			draggingClass: 'has-scroll-dragging',
			smoothClass: 'has-scroll-smooth',
			scrollbarContainer: false,
			scrollbarClass: 'c-scrollbar',
			multiplier: 1,
			firefoxMultiplier: 50,
			touchMultiplier: 2,
			scrollFromAnywhere: true,
			gestureDirection: 'vertical',
			reloadOnContextChange: false,
			resetNativeScroll: true,
		}, options, {
			el: node,
		});
		if (this.useLocomotiveScroll()) {
			const instance = new LocomotiveScroll(options);
			LocomotiveScrollService.instance = instance;
			return instance;
		} else {
			document.querySelector('html').classList.add('has-scroll-init');
		}
	}

	static useLocomotiveScroll() {
		return window.innerWidth >= 768 && !this.isMacLike();
	}

	static isMacLike() {
		const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
		return isMacLike;
	}

	static isIOS() {
		const isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
		return isIOS;
	}

	static isMacOs() {
		const isMacOs = navigator.platform.toLowerCase().indexOf('mac') >= 0;
		return isMacOs;
	}

	static isSafari() {
		const isSafari = navigator.vendor.match(/apple/i) &&
			!navigator.userAgent.match(/crios/i) &&
			!navigator.userAgent.match(/fxios/i);
		return isSafari;
	}

	static init$(node) {
		return fromEvent(window, 'load').pipe(
			delay(1),
			switchMap(_ => {
				// setTimeout(() => {
				const instance = LocomotiveScrollService.init(node);
				if (instance) {
					instance.on('scroll', instance => {
						LocomotiveScrollService.scroll(instance);
					});
				} else {
					const event = { direction: null, scroll: { x: 0, y: 0 }, speed: 0 };
					// const body = document.querySelector('body');
					let previousY = window.pageYOffset; // body.scrollTop;
					window.addEventListener('scroll', () => {
						const y = window.pageYOffset; // body.scrollTop;
						const direction = y > previousY ? 'down' : 'up';
						// console.log('scroll', y, direction);
						previousY = y;
						event.direction = direction;
						event.scroll.y = y;
						LocomotiveScrollService.scroll(event);
					}, true);
				}
				return LocomotiveScrollService.scroll$;
				// }, 1);
			})
		);
	}

	static update() {
		if (this.instance) {
			this.instance.update();
		}
	}

	static stop() {
		if (this.instance) {
			this.instance.stop();
		}
	}

	static start() {
		if (this.instance) {
			this.instance.start();
		}
	}

	static scrollTo(target, options) {
		if (this.instance) {
			this.instance.scrollTo(target, options);
		} else {
			target.scrollIntoView();
		}
	}

}
