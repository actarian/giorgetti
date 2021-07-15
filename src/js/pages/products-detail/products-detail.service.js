import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ProductsDetailService {

	static versions$(productId) {
		if (environment.flags.production) {
			return ApiService.get$('/products/versions?productId=' + productId);
		} else {
			return ApiService.get$('/products-detail/versions.json');
		}
	}

}
