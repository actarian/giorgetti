import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ProjectsRegistrationService {

	static data$() {
		if (environment.flags.production) {
			return ApiService.get$('/projects-registration/data.json');
		} else {
			return ApiService.get$('/projects-registration/data.json');
		}
	}

	static submit$(payload) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$('/projects-registration/submit.json', payload);
		} else {
			return ApiService.get$('/projects-registration/submit.json');
		}
	}

}
