import { combineLatest } from 'rxjs';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { CataloguesService } from './catalogues.service';

export class CataloguesComponent extends FiltersComponent {

	onInit() {
		super.onInit();
	}

	load$() {
		return combineLatest([
			CataloguesService.all$(),
		]);
	}

	doFilterItem(key, item, value) {
		switch (key) {
			default:
				return true;
		}
	}

}

CataloguesComponent.meta = {
	selector: '[catalogues]',
};
