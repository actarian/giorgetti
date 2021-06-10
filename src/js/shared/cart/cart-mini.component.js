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
		this.items = [];
		CartService.items$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(items => {
			this.items = items;
			this.pushChanges();
		});
	}

	onIncrement(item) {
		CartService.incrementItem$(item).pipe(
			first(),
		).subscribe();
	}

	onDecrement(item) {
		CartService.decrementItem$(item).pipe(
			first(),
		).subscribe();
	}

	onBuy(event) {
		console.log('CartMiniComponent.onBuy');
	}

	onRemoveAll(event) {
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
