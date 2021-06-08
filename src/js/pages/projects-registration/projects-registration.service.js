import { ApiService } from '../../common/api/api.service';

export class ProjectsRegistrationService {

	static data$() {
		return ApiService.get$('/projects-registration/data.json');
	}

	static submit$() {
		return ApiService.get$('/projects-registration/submit.json');
	}

}
