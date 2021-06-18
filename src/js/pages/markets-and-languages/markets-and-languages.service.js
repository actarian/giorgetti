import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class MarketsAndLanguagesService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/markets-and-languages/all.json');
		} else {
			return ApiService.get$('/markets-and-languages/all.json');
		}
	}

}
