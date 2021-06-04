import { ApiService } from '../../common/api/api.service';

export class NewsService {

	static all$() {
		return ApiService.get$('/news/all.json');
	}

	static filters$() {
		return ApiService.get$('/news/filters.json');
	}

}
