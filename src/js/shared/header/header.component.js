import { Component, getContext } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalResolveEvent, ModalService } from '../../common/modal/modal.service';
import { environment } from '../../environment';
import { UserService } from '../user/user.service';

export const HeaderMode = {
	IDLE: 'idle',
	MENU: 'menu',
	SEARCH: 'search',
	CART: 'cart',
}

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
		this.show = HeaderMode.IDLE;
		const pictogram = document.querySelector('.page > .pictogram');
		LocomotiveScrollService.scroll$.pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((event) => {
			this.direction = event.direction;
			this.scrolled = event.scroll.y > 100;
			const opacity = 0.1 - 0.1 * Math.min(1, Math.max(0, (event.scroll.y - window.innerHeight * 3) / window.innerHeight / 3));
			gsap.set(pictogram, { opacity });
			// console.log('HeaderComponent', event.scroll.y, event.direction, event.speed);
		});
		this.user = null;
		UserService.me$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(user => {
			this.user = user;
			this.pushChanges();
		});
	}

	onLogin() {
		ModalService.open$({ src: environment.template.modal.userModal, data: { view: 1 } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('HeaderComponent.onLogin', event);
			if (event instanceof ModalResolveEvent) {
				window.location.href = environment.slug.reservedArea;
			}
		});
	}

	onLogout() {
		UserService.signout$().pipe(
			first(),
		).subscribe();
	}

	onToggleMenu() {
		this.show = this.show === HeaderMode.MENU ? HeaderMode.IDLE : HeaderMode.MENU;
		this.pushChanges();
	}

	onToggleSearch() {
		this.show = this.show === HeaderMode.SEARCH ? HeaderMode.IDLE : HeaderMode.SEARCH;
		this.pushChanges();
	}

	onToggleCart() {
		this.show = this.show === HeaderMode.CART ? HeaderMode.IDLE : HeaderMode.CART;
		this.pushChanges();
	}
}

HeaderComponent.meta = {
	selector: '[header]',
};
