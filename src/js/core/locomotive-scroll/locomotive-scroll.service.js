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
		if (node.offsetWidth >= 768) {
			const instance = new LocomotiveScroll(options);
			LocomotiveScrollService.instance = instance;
			return instance;
		} else {
			document.querySelector('html').classList.add('has-scroll-init');
		}
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
					const body = document.querySelector('body');
					let previousY = body.scrollTop; // window.pageYOffset
					window.addEventListener('scroll', () => {
						const y = body.scrollTop; // window.pageYOffset
						const direction = y > previousY ? 'down' : 'up';
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

}
