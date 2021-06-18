import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class NewsletterService {

	static data$() {
		if (environment.flags.production) {
			return ApiService.get$('/newsletter/data.json');
		} else {
			return ApiService.get$('/newsletter/data.json');
		}
	}

	static submit$(payload) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$('/newsletter/submit.json', payload);
		} else {
			return ApiService.get$('/newsletter/submit.json');
		}
	}

}
