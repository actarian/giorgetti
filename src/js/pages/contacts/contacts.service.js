import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class ContactsService {

	static data$() {
		if (environment.flags.production) {
			return ApiService.get$('/contacts/data.json');
		} else {
			return ApiService.get$('/contacts/data.json');
		}
	}

	static submit$(payload) {
		if (environment.flags.production) {
			// !!! convert to .post$
			return ApiService.get$('/contacts/submit.json', payload);
		} else {
			return ApiService.get$('/contacts/submit.json');
		}
	}

}
