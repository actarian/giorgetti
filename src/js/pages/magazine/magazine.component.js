import { combineLatest } from 'rxjs';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { MagazineService } from './magazine.service';

export class MagazineComponent extends FiltersComponent {

	onInit() {
		super.onInit();
		this.categoryId = this.categoryId || null;
	}

	load$() {
		return combineLatest([
			MagazineService.all$(),
			MagazineService.filters$(),
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
			case 'search':
				return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					item.country.toLowerCase().indexOf(value.toLowerCase()) !== -1;
			default:
				return false;
		}
	}

}

MagazineComponent.meta = {
	selector: '[magazine]',
	inputs: ['categoryId'],
};
