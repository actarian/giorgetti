import { ApiService } from '../../common/api/api.service';

export class ProductsDetailService {

	static versions$() {
		return ApiService.get$('/products-detail/versions.json');
	}

}
