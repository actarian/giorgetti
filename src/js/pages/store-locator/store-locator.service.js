import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/api/api.service';

export class StoreLocatorService {

	static all$() {
		return ApiService.get$('/store-locator/all.json').pipe(
			map(items => items.sort((a, b) => {
				return a.rank - b.rank;
			})),
		);
	}

	static filters$() {
		return ApiService.get$('/store-locator/filters.json');
	}

}
