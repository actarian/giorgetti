import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class AmbienceService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/ambience/all.json');
		} else {
			return ApiService.get$('/ambience/all.json');
		}
	}

	static filters$() {
		if (environment.flags.production) {
			return ApiService.get$('/ambience/filters.json');
		} else {
			return ApiService.get$('/ambience/filters.json');
		}
	}

}
