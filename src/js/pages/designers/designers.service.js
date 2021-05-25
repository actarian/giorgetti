import { ApiService } from '../../core/api/api.service';

export class DesignersService {

	static all$() {
		return ApiService.get$('/designers/all.json');
	}

	static filters$() {
		return ApiService.get$('/designers/filters.json');
	}

}