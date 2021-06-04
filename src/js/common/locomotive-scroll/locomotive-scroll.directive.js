import { Directive, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { LocomotiveScrollService } from './locomotive-scroll.service';

export class LocomotiveScrollDirective extends Directive {

	onInit() {
		const { node } = getContext(this);
		LocomotiveScrollService.init$(node).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('LocomotiveScrollDirective', event);
		});
		/*
		window.onload = () => {
			setTimeout(() => {
				const instance = LocomotiveScrollService.init(node);
				if (instance) {
					instance.on('scroll', instance => {
						LocomotiveScrollService.scroll(instance.scroll.y);
					});
				} else {
					const body = document.querySelector('body');
					window.addEventListener('scroll', () => {
						const y = body.scrollTop; // window.pageYOffset
						LocomotiveScrollService.scroll(y);
					}, true);
				}
			}, 1);
		};
		*/
	}

}

LocomotiveScrollDirective.meta = {
	selector: '[locomotive-scroll],[[locomotive-scroll]]'
};
