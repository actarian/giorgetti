import { Component } from 'rxcomp';
import { first, takeUntil } from 'rxjs/operators';
import { environment } from '../../environment';
import { HeaderService } from '../header/header.service';
import { CartMiniService } from './cart-mini.service';

export class CartMiniComponent extends Component {

	get totalPrice() {
		const items = this.items || [];
		return items.reduce((p, c, i) => {
			return p + c.price * c.qty;
		}, 0);
	}

	onInit() {
		this.items = [];
		CartMiniService.items$().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(items => {
			this.items = items;
			this.pushChanges();
		});
	}

	onIncrement(item) {
		CartMiniService.incrementItem$(item).pipe(
			first(),
		).subscribe();
	}

	onDecrement(item) {
		CartMiniService.decrementItem$(item).pipe(
			first(),
		).subscribe();
	}

	onEdit(item) {
		// console.log('CartMiniComponent.onEdit', item);
		window.location.href = `${environment.slug.configureProduct}?productId=${item.id}&code=${item.code}${item.showefy ? `&sl=${item.showefy.product_link.split('&sl=')[1]}` : ''}`;
	}

	onRemoveAll(event) {
		CartMiniService.removeAll$().pipe(
			first(),
		).subscribe();
	}

	onClose(event) {
		HeaderService.onBack();
	}

}

CartMiniComponent.meta = {
	selector: '[cart-mini]',
};
