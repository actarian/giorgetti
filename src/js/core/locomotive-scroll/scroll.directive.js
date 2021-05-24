import { Directive, getContext } from 'rxcomp';
import { takeUntil, tap } from 'rxjs/operators';
import { LocomotiveScrollService } from './locomotive-scroll.service';

export class ScrollDirective extends Directive {

	onInit() {
		if (!LocomotiveScrollService.useLocomotiveScroll()) {
			this.scroll$().pipe(
				takeUntil(this.unsubscribe$),
			).subscribe(event => {
				// console.log('ScrollDirective', event);
			});
		}
	}

	scroll$() {
		const { node } = getContext(this);
		const speed = node.hasAttribute('data-scroll-speed') ? parseFloat(node.getAttribute('data-scroll-speed')) : 1.5;
		return LocomotiveScrollService.scroll$.pipe(
			tap(scroll => {
				const wh = window.innerHeight;
				const wh2 = wh / 2;
				const rect = node.getBoundingClientRect();
				const currentY = gsap.getProperty(node, 'y');
				const top = rect.top - currentY;
				const bottom = rect.bottom - currentY;
				if (top < wh && bottom > 0) {
					const pow = (top - wh2) / wh2;
					const y = pow * speed * 40;
					gsap.set(node, { y });
				}
			}),
		);
	}

}

ScrollDirective.meta = {
	selector: '[data-scroll]'
};
