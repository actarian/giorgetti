import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class MagazineService {

	static all$() {
		if (environment.flags.production)
		{
			var url = environment.currentCaOrder.length === 1 ? '/magazine/all' : '/magazine/all/' + environment.currentCaId;
			return ApiService.get$(url);
		} else {
			return ApiService.get$('/magazine/all.json');
		}
	}

	static filters$() {
		if (environment.flags.production) {
			return ApiService.get$('/magazine/filters');
		} else {
			return ApiService.get$('/magazine/filters.json');
		}
	}

}
