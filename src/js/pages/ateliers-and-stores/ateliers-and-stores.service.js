import { ApiService } from '../../common/api/api.service';

export class AteliersAndStoresService {

	static all$() {
		return ApiService.get$('/ateliers-and-stores/all.json');
	}

	static ateliers$() {
		return ApiService.get$('/ateliers-and-stores/ateliers.json');
	}

	static stores$() {
		return ApiService.get$('/ateliers-and-stores/stores.json');
	}

	static filters$() {
		return ApiService.get$('/ateliers-and-stores/filters.json');
	}

}
