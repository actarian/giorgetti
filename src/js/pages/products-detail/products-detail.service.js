import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ProductsDetailService {

	static versions$() {
		if (environment.flags.production) {
			return ApiService.get$('/products-detail/versions.json');
		} else {
			return ApiService.get$('/products-detail/versions.json');
		}
	}

}
