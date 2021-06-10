import { Component } from 'rxcomp';
import { FormControl, FormGroup } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../common/filter/filter-item';
import { FilterService } from '../../common/filter/filter.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import { NewsService } from './news.service';

export class NewsComponent extends Component {

	onInit() {
		this.items = [];
		this.filteredItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			country: new FormControl(null),
			search: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('NewsComponent.changes$', form.value);
			this.setFilterByKeyAndValue('country', form.value.country);
			this.setFilterByKeyAndValue('search', form.value.search);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			this.filters = data[1];
			controls.country.options = FormService.toSelectOptions(this.filters.country.options);
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			NewsService.all$(),
			NewsService.filters$(),
		]);
	}

	onLoad() {
		const items = this.items;
		const filters = this.filters;
		Object.keys(filters).forEach(key => {
			filters[key].mode = filters[key].mode || FilterMode.OR;
		});
		const initialParams = {};
		const filterService = new FilterService(filters, initialParams, (key, filter) => {
			switch (key) {
				default:
					filter.filter = (item, value) => {
						switch (key) {
							case 'country':
								return item.country.id === value;
							case 'search':
								return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									item.abstract.toLowerCase().indexOf(value.toLowerCase()) !== -1
							default:
						}
					};
			}
		});
		this.filterService = filterService;
		this.filters = filterService.filters;
		const country = this.filters.country.values.length ? this.filters.country.values[0] : null;
		const search = this.filters.search.values.length ? this.filters.search.values[0] : null;
		this.form.patch({ country, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('NewsComponent.filteredItems', filteredItems.length);
		});
	}

	setFilterByKeyAndValue(key, value) {
		const filter = this.filters[key];
		if (filter) {
			if (filter.mode === FilterMode.QUERY) {
				filter.set(value);
			} else {
				const option = filter.options.find(x => x.value === value);
				// console.log(filter.options, option);
				if (option) {
					filter.set(option);
				} else {
					filter.clear();
				}
			}
		}
	}

	onSearch(model) {
		// console.log('NewsComponent.onSearch', this.form.value);
		this.setFilterByKeyAndValue('country', this.form.value.country);
		this.setFilterByKeyAndValue('search', this.form.value.search);
		this.pushChanges();
	}

	clearFilter(event, filter) {
		event.preventDefault();
		event.stopImmediatePropagation();
		filter.clear();
		this.pushChanges();
	}
}

NewsComponent.meta = {
	selector: '[news]',
};
