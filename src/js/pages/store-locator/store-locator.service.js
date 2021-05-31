import { ApiService } from '../../core/api/api.service';

export class StoreLocatorService {

	static all$() {
		return ApiService.get$('/store-locator/all.json');
	}

	static filters$() {
		return ApiService.get$('/store-locator/filters.json');
	}

}
