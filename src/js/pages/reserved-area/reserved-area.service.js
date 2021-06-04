import { map } from 'rxjs/operators';
import { ApiService } from '../../shared/api/api.service';

export class ReservedAreaService {

	static all$() {
		return ApiService.get$('/reserved-area/all.json').pipe(
			map(items => {
				items.forEach(x => {
					x.title = ReservedAreaService.toTitleCase(x.title.replace(/_/g, ' '));
				});
				return items;
			}),
		);
	}

	static toTitleCase(sentence, seps = ' _-/') {
		const capitalize = str => str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
		const escape = str => str.replace(/./g, c => `\\${c}`);
		let wordPattern = new RegExp(`[^${escape(seps)}]+`, 'g');
		return sentence.replace(wordPattern, capitalize);
	}

}
