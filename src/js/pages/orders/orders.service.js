import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class OrdersService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/orders/all.json');
		} else {
			return ApiService.get$('/orders/all.json');
		}
	}

	static detail$(item) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$('/orders/detail.json', item);
		} else {
			return ApiService.get$('/orders/detail.json');
		}
	}

}
