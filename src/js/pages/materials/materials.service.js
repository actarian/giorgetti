import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';

export class MaterialsService {

	static all$() {
		return ApiService.get$('/materials/all.json');
	}

	static filters$() {
		return ApiService.get$('/materials/filters.json');
	}

	static fake$() {
		return combineLatest([MaterialsService.all$(), ApiService.get$('/materials/all_.json')]).pipe(
			map(data => {
				const items = data[0];
				const items_ = data[1];
				items.forEach((item, i) => {
					const item_ = items_.find(x => x.id === item.id);
					if (item_) {
						item.image = item_.image.replace(/\s/g, '_').toLowerCase();
						item.zoom = item_.zoom.replace(/\s/g, '_').toLowerCase();
					}
					// item.collection = MaterialsService.toTitleCase(item.collection);
					// item.title = MaterialsService.toTitleCase(item.title);
				});
				console.log(JSON.stringify(items));
				return items;
			})
		);
	}

	static toTitleCase(sentence, seps = ' _-/') {
		const capitalize = str => str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
		const escape = str => str.replace(/./g, c => `\\${c}`);
		let wordPattern = new RegExp(`[^${escape(seps)}]+`, 'g');
		return sentence.replace(wordPattern, capitalize);
	}

}
