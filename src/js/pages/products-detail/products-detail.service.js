import { map } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ProductsDetailService {

	static versions$(productId) {
		if (environment.flags.production) {
			return ApiService.get$('/products/versions?productId=' + productId).pipe(
				map(versions => {
					versions.sort((a, b) => {
						if (a.configurable !== b.configurable) {
							return a.configurable ? -1 : 1;
						} else {
							return 0;
						}
					});
					return versions;
				}),
			);
		} else {
			return ApiService.get$('/products-detail/versions.json');
		}
	}

}
