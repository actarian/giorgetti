import { ApiService } from '../../core/api/api.service';

export class AmbienceService {

	static all$() {
		return ApiService.get$('/ambience/all.json');
	}

	static filters$() {
		return ApiService.get$('/ambience/filters.json');
	}

}
