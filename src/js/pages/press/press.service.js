import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class PressService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/press/all');
		} else {
			return ApiService.get$('/press/all.json');
		}
	}

}
