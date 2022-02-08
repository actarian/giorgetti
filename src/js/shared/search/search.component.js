import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { of } from 'rxjs';
import { auditTime, delay, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { SearchService } from './search.service';

export const SEARCH_LIMIT_RESULT = 50;

export class SearchComponent extends Component {

	onInit() {
		this.busy = false;
		this.items = [];
		this.visibleItems = [];
		const form = this.form = new FormGroup({
			search: new FormControl(null, [Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		this.search$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe((items) => {
			this.items = items;
			this.visibleItems = items.slice(0, Math.min(SEARCH_LIMIT_RESULT, items.length));
			this.busy = false;
			this.pushChanges();
		});
		setTimeout(() => {
			const { node } = getContext(this);
			const input = node.querySelector('.control--text');
			if (input) {
				input.focus();
			}
			// console.log('SearchComponent', input);
		}, 300);
	}

	search$() {
		return this.form.changes$.pipe(
			auditTime(500),
			map(changes => changes.search),
			distinctUntilChanged(),
			switchMap(query => {
				if (query != null && query.length > 1) {
					this.busy = true;
					this.pushChanges();
					return SearchService.search$(query).pipe(
						delay(1),
					);
				} else {
					return of([]);
				}
			}),
		);
	}

}

SearchComponent.meta = {
	selector: '[search]',
};
