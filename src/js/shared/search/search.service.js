import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';
import { environment } from '../../environment';

export class SearchService {

	static search$_() {
		if (SearchService.items_) {
			return of(SearchService.items_);
		} else {
			return (
				environment.flags.production ?
					ApiService.get$(`/search/search`) :
					ApiService.get$(`/search/search.json`)
			).pipe(
				tap(items => {
					items.forEach(item => {
						item.title = SearchService.toTitleCase(item.title);
						if (item.abstract) {
							item.abstract = SearchService.toTitleCase(item.abstract);
						}
					});
					SearchService.items_ = items;
				}),
			);
		}
	}

	static search$(query) {
		query = query.toLowerCase();
		return this.search$_().pipe(
			map(items => {
				items = items.filter(item => {
					if (item.title.toLowerCase().indexOf(query) !== -1) {
						item.result = item.title;
						return true;
					} else if (item.abstract && item.abstract.toLowerCase().indexOf(query) !== -1) {
						item.result = item.abstract;
						return true;
					} else {
						return false;
					}
				});
				items.sort((a, b) => {
					return a.result.toLowerCase().indexOf(query) - b.result.toLowerCase().indexOf(query);
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
