import { ApiService } from '../../common/api/api.service';

export class MaterialsService {

	static all$() {
		return ApiService.get$('/materials/all.json');
	}

	static filters$() {
		return ApiService.get$('/materials/filters.json');
	}

}
