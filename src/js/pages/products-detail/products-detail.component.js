import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { environment } from '../../environment';
import { CartMiniService } from '../../shared/cart-mini/cart-mini.service';
import { HeaderService } from '../../shared/header/header.service';
import { ProductsDetailService } from './products-detail.service';

export class ProductsDetailComponent extends Component {

	onInit() {
		this.items = [];
		this.visibleItems = [];
		ProductsDetailService.versions$().pipe(
			first(),
		).subscribe(items => {
			this.items = items;
			this.visibleItems = this.items.slice(0, Math.min(4, this.items.length));
			this.pushChanges();
		});
	}

	isAddedToCart(item) {
		return CartMiniService.hasItem(item);
	}

	onAddToCart(item) {
		if (this.isAddedToCart(item)) {
			HeaderService.setHeader('cart');
		} else {
			CartMiniService.addItem$(item).pipe(
				first(),
			).subscribe(_ => {
				this.pushChanges();
			});
		}
	}

	scrollTo(id) {
		const { node } = getContext(this);
		const target = node.querySelector(id);
		if (target) {
			LocomotiveScrollService.scrollTo(target, { offset: -200 });
		}
	}

	showMore(event) {
		const pageSize = 12;
		if (this.visibleItems.length + pageSize >= this.items.length) {
			this.visibleItems = this.items.slice();
		} else {
			this.visibleItems = this.items.slice(0, Math.min(this.visibleItems.length + pageSize, this.items.length));
		}
		this.pushChanges();
		LocomotiveScrollService.update();
	}

	configureProduct(item) {
		window.location.href = `${environment.slug.configureProduct}?codprod=${this.product.code}`;
	}
}

ProductsDetailComponent.meta = {
	selector: '[products-detail]',
	inputs: ['product'],
};
