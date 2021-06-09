import { ApiService } from '../../common/api/api.service';

export class CareersService {

	static data$() {
		return ApiService.get$('/careers/data.json');
	}

	static submit$() {
		return ApiService.post$('/careers/submit.json');
	}

}
