import { ApiService } from '../../common/api/api.service';

export class MarketsAndLanguagesService {

	static all$() {
		return ApiService.get$('/markets-and-languages/all.json');
	}

}
