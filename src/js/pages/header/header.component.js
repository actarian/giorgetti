import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';

export class HeaderComponent extends Component {

	direction_ = null;
	get direction() {
		return this.direction_;
	}
	set direction(direction) {
		if (this.direction_ !== direction) {
			const { node } = getContext(this);
			node.classList.remove(`scrolling-${this.direction_}`);
			node.classList.add(`scrolling-${direction}`);
			this.direction_ = direction;
		}
	}

	onInit() {
		LocomotiveScrollService.scroll$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((event) => {
			this.direction = event.direction;
			// console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
			// gsap.set(node, { y });
		});
	}
}

HeaderComponent.meta = {
	selector: '[header]',
};
