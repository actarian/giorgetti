import { combineLatest } from 'rxjs';
import { FiltersComponent } from '../../shared/filters/filters.component';
import { PressService } from './press.service';

export class PressComponent extends FiltersComponent {

	onInit() {
		super.onInit();
	}

	load$() {
		return combineLatest([
			PressService.all$(),
		]);
	}

	doFilterItem(key, item, value) {
		switch (key) {
			default:
				return true;
		}
	}

}

PressComponent.meta = {
	selector: '[press]',
};
