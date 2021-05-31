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

	scrolled_ = null;
	get scrolled() {
		return this.scrolled_;
	}
	set scrolled(scrolled) {
		if (this.scrolled_ !== scrolled) {
			this.scrolled_ = scrolled;
			const { node } = getContext(this);
			scrolled ? node.classList.add(`scrolled`) : node.classList.remove(`scrolled`);
		}
	}

	onInit() {
		const pictogram = document.querySelector('.page > .pictogram');
		LocomotiveScrollService.scroll$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((event) => {
			this.direction = event.direction;
			this.scrolled = event.scroll.y > 100;
			const opacity = 0.1 - 0.1 * Math.min(1, event.scroll.y / window.innerHeight / 4);
			gsap.set(pictogram, { opacity });
			// console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
		});
	}
}

HeaderComponent.meta = {
	selector: '[header]',
};
