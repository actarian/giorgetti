import { ApiService } from '../../common/api/api.service';

export class NewsletterService {

	static data$() {
		return ApiService.get$('/newsletter/data.json');
	}

	static submit$() {
		return ApiService.post$('/newsletter/submit.json');
	}

}
