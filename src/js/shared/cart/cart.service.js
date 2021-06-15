import { BehaviorSubject, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { LocalStorageService } from '../../common/storage/local-storage.service';

export class CartService {

	static active$_ = new BehaviorSubject(false);
	static get active() {
		return CartService.active$_.getValue();
	}
	static active$() {
		const page = document.querySelector('.page');
		return CartService.active$_.pipe(
			distinctUntilChanged(),
			tap(active => {
				active ? page.classList.add('cart-mini-active') : page.classList.remove('cart-mini-active');
			}),
		);
	}
	static setActive(active) {
		this.active$_.next(active);
	}

	static items$_ = new BehaviorSubject([]);

	static get currentItems() {
		return CartService.items$_.getValue();
	}

	static get count() {
		return CartService.currentItems.length;
	}

	static hasItem(item) {
		const items = CartService.currentItems;
		const index = CartService.indexOf(item, items);
		return index !== -1;
	}

	static setItems(items) {
		if (items) {
			LocalStorageService.set('cartItems', items);
		} else {
			LocalStorageService.delete('cartItems');
		}
		CartService.items$_.next(items);
	}

	static items$() {
		const localItems = LocalStorageService.get('cartItems') || [];
		return of(localItems).pipe(
			switchMap(items => {
				CartService.setItems(items);
				return CartService.items$_;
			})
		);
	}

	static incrementItem$(item) {
		return of(item).pipe(
			map(item => {
				const items = CartService.currentItems.slice();
				const item_ = CartService.find(item, items);
				if (item_) {
					item_.qty++;
					CartService.setItems(items);
					return item_;
				} else {
					return null;
				}
			}),
		)
	}

	static decrementItem$(item) {
		return of(item).pipe(
			switchMap(item => {
				const items = CartService.currentItems.slice();
				const item_ = CartService.find(item, items);
				if (item_) {
					item_.qty--;
					if (item_.qty > 0) {
						CartService.setItems(items);
						return of(item_);
					} else {
						return CartService.removeItem$(item);
					}
				} else {
					return of(null);
				}
			}),
		)
	}

	static addItem$(item) {
		return of(Object.assign({ qty: 1 }, item)).pipe(
			map(item => {
				const items = CartService.currentItems.slice();
				const item_ = CartService.find(item, items);
				if (item_) {
					item_.qty += item.qty;
					CartService.setItems(items);
					return item_;
				} else {
					items.push(item);
					CartService.setItems(items);
					return item;
				}
			}),
		)
	}

	static removeItem$(item) {
		return of(item).pipe(
			map(item => {
				const items = CartService.currentItems.slice();
				const index = CartService.indexOf(item, items);
				if (index !== -1) {
					items.splice(index, 1);
					if (items.length === 0) {
						CartService.setActive(false);
					}
					CartService.setItems(items);
					return item;
				} else {
					return null;
				}
			}),
		)
	}

	static removeAll$() {
		return of([]).pipe(
			map(items => {
				CartService.setActive(false);
				CartService.setItems(items);
				return items;
			}),
		)
	}

	static match(item, item_) {
		return item_.id === item.id && item_.showefy && item.showefy && item_.showefy.product_link === item.showefy.product_link;
	}

	static find(item, items) {
		return items.find(item_ => CartService.match(item, item_));
	}

	static indexOf(item, items) {
		return items.reduce((p, item_, i) => {
			return p !== -1 ? p : (CartService.match(item, item_) ? i : p);
		}, -1);
	}

}
