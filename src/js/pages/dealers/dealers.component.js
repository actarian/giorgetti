import { Component } from 'rxcomp';
import { FormControl, FormGroup } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../common/filter/filter-item';
import { FilterService } from '../../common/filter/filter.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import { DealersService } from './dealers.service';

export class DealersComponent extends Component {

	onInit() {
		this.items = [];
		this.filteredItems = [];
		this.visibleItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			country: new FormControl(null),
			search: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('DealersComponent.changes$', form.value);
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
			DealersService.all$(),
			DealersService.filters$(),
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
								return item.countries && item.countries.find(x => x.value === value);
							case 'search':
								return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									// item.address.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									(item.city && item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
									(item.countries && item.countries.find(x => x.label.toLowerCase().indexOf(value.toLowerCase()) !== -1))
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
			this.visibleItems = filteredItems.slice(0, Math.min(12, filteredItems.length));
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('DealersComponent.filteredItems', filteredItems.length);
		});
	}

	showMore(event) {
		this.visibleItems = this.filteredItems.slice();
		this.pushChanges();
		LocomotiveScrollService.update();
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
		// console.log('DealersComponent.onSearch', this.form.value);
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

DealersComponent.meta = {
	selector: '[dealers]',
};
