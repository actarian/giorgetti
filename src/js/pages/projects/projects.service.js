import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ProjectsService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/projects/all.json');
		} else {
			return ApiService.get$('/projects/all.json');
		}
	}

	static filters$() {
		if (environment.flags.production) {
			return ApiService.get$('/projects/filters.json');
		} else {
			return ApiService.get$('/projects/filters.json');
		}
	}

}
