import { Component, getContext } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { ModalResolveEvent, ModalService } from './common/modal/modal.service';
import { environment } from './environment';
import { CartService } from './shared/cart/cart.service';
import { UserService } from './shared/user/user.service';

export class AppComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		console.log('AppComponent.onInit');
		this.showCart = false;
		CartService.active$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(active => {
			this.showCart = active;
			this.pushChanges();
		});
		CartService.items$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(_ => this.pushChanges());
	}

	onOpenMarketAndLanguage() {
		ModalService.open$({ src: environment.template.modal.marketsAndLanguagesModal }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('AppComponent.onOpenMarketAndLanguage', event);
		});
	}

	onLogin() {
		ModalService.open$({ src: environment.template.modal.userModal, data: { view: 1 } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('AppComponent.onLogin', event);
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

	onProjectRegistration(event) {
		ModalService.open$({ src: environment.template.modal.projectsRegistrationModal }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('AppComponent.onProjectRegistration', event);
			/*
			if (event instanceof ModalResolveEvent) {
				// window.location.href = environment.slug.reservedArea;
			}
			*/
		});
	}

	onAddToCart(item) {
		CartService.addItem$(item).pipe(
			first(),
		).subscribe(_ => {
			this.pushChanges();
		});
	}

	onOpenMiniCart() {
		CartService.setActive(true);
	}

}

AppComponent.meta = {
	selector: '[app-component]',
};
