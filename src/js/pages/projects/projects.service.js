import { ApiService } from '../../core/api/api.service';

export class ProjectsService {

	static all$() {
		return ApiService.get$('/projects/all.json');
	}

	static filters$() {
		return ApiService.get$('/projects/filters.json');
	}

}
