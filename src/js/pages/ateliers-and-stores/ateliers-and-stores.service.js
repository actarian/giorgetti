import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class AteliersAndStoresService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/ateliers-and-stores/all.json');
		} else {
			return ApiService.get$('/ateliers-and-stores/all.json');
		}
	}

	static ateliers$() {
		if (environment.flags.production) {
			return ApiService.get$('/ateliers-and-stores/ateliers.json');
		} else {
			return ApiService.get$('/ateliers-and-stores/ateliers.json');
		}
	}

	static stores$() {
		if (environment.flags.production) {
			return ApiService.get$('/ateliers-and-stores/stores.json');
		} else {
			return ApiService.get$('/ateliers-and-stores/stores.json');
		}
	}

	static filters$() {
		if (environment.flags.production) {
			return ApiService.get$('/ateliers-and-stores/filters.json');
		} else {
			return ApiService.get$('/ateliers-and-stores/filters.json');
		}
	}

}
