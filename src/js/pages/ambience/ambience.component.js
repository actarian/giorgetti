import { combineLatest } from 'rxjs';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { AmbienceService } from './ambience.service';

export class AmbienceComponent extends FiltersComponent {

	onInit() {
		super.onInit();
		this.ambienceId = this.ambienceId || null;
	}

	load$() {
		return combineLatest([
			AmbienceService.all$(),
			AmbienceService.filters$(),
		]);
	}

	setFiltersParams() {
		if (this.ambienceId) {
			this.filters.ambience.set({ value: this.ambienceId });
		}
	}

	doFilterItem(key, item, value) {
		switch (key) {
			case 'ambience':
				return item.ambiences.indexOf(value) !== -1;
			case 'category':
				return item.category.id === value;
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

AmbienceComponent.meta = {
	selector: '[ambience]',
	inputs: ['ambienceId'],
};
