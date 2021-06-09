// import { combineLatest } from 'rxjs';
// import { map } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';

export class ProductsService {

	static all$() {
		return ApiService.get$('/products/all.json');
	}

	static filters$() {
		return ApiService.get$('/products/filters.json');
	}

	/*
	static fake$() {
		return combineLatest([ProductsService.all$(), ApiService.get$('/products/all_.json')]).pipe(
			map(data => {
				const items = data[0];
				const items_ = data[1];
				items.forEach((item, i) => {
					const other = items_.find(x => x.title === item.title);
					if (other) {
						item.category = {
							id: 1,
							name: other.url.replace('https://www.giorgettimeda.com/it/prodotti/', '').split('/')[0],
						};
					}
				});
				console.log(JSON.stringify(items));
				return items;
			})
		);
	}
	*/

}
