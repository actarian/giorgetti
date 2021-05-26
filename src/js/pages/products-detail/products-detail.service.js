import { ApiService } from '../../core/api/api.service';

export class ProductsDetailService {

	static versions$() {
		return ApiService.get$('/products-detail/versions.json');
	}

}
