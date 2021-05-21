import { ApiService } from '../../core/api/api.service';

export class NewsService {

	static all$() {
		return ApiService.get$('/news/all.json'); // .pipe(map(response => response.data));
	}

	static filters$() {
		return ApiService.get$('/news/filters.json'); // .pipe(map(response => response.data));
	}

}
