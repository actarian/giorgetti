import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { ProductsService } from './products.service';

export class ProductsComponent extends FiltersComponent {

	onInit() {
		super.onInit();
		this.categoryId = this.categoryId || null;
		this.shop = this.shop || false;
	}

	load$() {
		return combineLatest([
			ProductsService.all$().pipe(
				map(products => {
					return products.filter(x => this.shop ? x.configurable : true);
				}),
			),
			ProductsService.filters$(),
		]);
	}

	setFiltersParams() {
		if (this.categoryId) {
			this.filters.category.set({ value: this.categoryId });
		}
	}

	doFilterItem(key, item, value) {
		switch (key) {
			case 'category':
				return item.category.id === value;
			case 'ambience':
				return item.ambiences.indexOf(value) !== -1;
			case 'material':
				return item.materials.indexOf(value) !== -1;
			case 'designer':
				return item.designers.indexOf(value) !== -1;
			case 'search':
				return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
			default:
				return false;
		}
	}

}

ProductsComponent.meta = {
	selector: '[products]',
	inputs: ['categoryId', 'shop'],
};
