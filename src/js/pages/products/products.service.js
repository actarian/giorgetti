import { ApiService } from '../../common/api/api.service';

export class ProductsService {

	static all$() {
		return ApiService.get$('/products/all.json');
	}

	static filters$() {
		return ApiService.get$('/products/filters.json');
	}

}
