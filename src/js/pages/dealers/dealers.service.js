import { map } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';

export class DealersService {

	static all$() {
		return ApiService.get$('/dealers/all.json').pipe(
			map(items => items.sort((a, b) => {
				return b.regions.length - a.regions.length;
			})),
		);
	}

	static filters$() {
		return ApiService.get$('/dealers/filters.json');
	}

}
