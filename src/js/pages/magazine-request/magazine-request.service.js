import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class MagazineRequestService {

	static data$() {
		if (environment.flags.production) {
			return ApiService.get$('/magazine-request/data');
		} else {
			return ApiService.get$('/magazine-request/data.json');
		}
	}

	static submit$(payload) {
		if (environment.flags.production) {
			return ApiService.post$('/magazine-request/submit', payload);
		} else {
			return ApiService.get$('/magazine-request/submit.json');
		}
	}

}
