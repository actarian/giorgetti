import { Component } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { CartService } from './cart.service';

export class CartMiniComponent extends Component {

	get total() {
		const items = this.items || [];
		return items.reduce((p, c, i) => {
			return p + c.price * c.qty;
		}, 0);
	}

	onInit() {
		this.showCart = false;
		this.items = [];
		CartService.items$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(items => {
			if (CartService.active) {
				this.items = items;
				this.pushChanges();
			}
		});
	}

	onToggleCart(event) {
		this.showCart = !this.showCart;
		this.pushChanges();
	}

	isAddedToCart(item) {
		return CartService.hasItem(item);
	}

	onIncrement(item) {
		CartService.incrementItem$(item).pipe(
			first(),
		).subscribe(_ => {
			this.pushChanges();
		});
	}

	onDecrement(item) {
		CartService.decrementItem$(item).pipe(
			first(),
		).subscribe(_ => {
			this.pushChanges();
		});
	}

	onRemoveAll() {
		CartService.removeAll$().pipe(
			first(),
		).subscribe();
	}

	onClose(event) {
		CartService.setActive(false);
	}

}

CartMiniComponent.meta = {
	selector: '[cart-mini]',
};
