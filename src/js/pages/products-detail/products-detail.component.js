import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { environment } from '../../environment';
import { LocomotiveScrollService } from '../../shared/locomotive-scroll/locomotive-scroll.service';
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

	scrollTo(id) {
		const { node } = getContext(this);
		const target = node.querySelector(id);
		if (target) {
			LocomotiveScrollService.scrollTo(target, { offset: -200 });
		}
	}

	showVersions(event) {
		this.visibleItems = this.items.slice();
		this.pushChanges();
		LocomotiveScrollService.update();
	}

	configureProduct(event) {
		window.location.href = environment.slug.configureProduct;
	}
}

ProductsDetailComponent.meta = {
	selector: '[products-detail]',
};
