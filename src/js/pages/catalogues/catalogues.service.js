import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class CataloguesService {

	static all$() {
		if (environment.flags.production) {
			return ApiService.get$('/catalogues/all');
		} else {
			return ApiService.get$('/catalogues/all.json');
		}
	}

}
