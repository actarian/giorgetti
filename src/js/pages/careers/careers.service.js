import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class CareersService {

	static data$() {
		if (environment.flags.production) {
			return ApiService.get$('/careers/data.json');
		} else {
			return ApiService.get$('/careers/data.json');
		}
	}

	static submit$(payload) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$('/careers/submit.json', payload);
		} else {
			return ApiService.get$('/careers/submit.json');
		}
	}

}
