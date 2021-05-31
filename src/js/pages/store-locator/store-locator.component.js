import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../core/filter/filter-item';
import { FilterService } from '../../core/filter/filter.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { StoreLocatorService } from './store-locator.service';

export class StoreLocatorComponent extends Component {

	onInit() {
		this.items = [];
		this.filteredItems = [];
		this.visibleItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			country: new FormControl(null, [Validators.RequiredValidator()]),
			category: new FormControl(null, [Validators.RequiredValidator()]),
			search: new FormControl(null, [Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('StoreLocatorComponent.changes$', form.value);
			this.setFilterByKeyAndValue('country', form.value.country);
			this.setFilterByKeyAndValue('category', form.value.category);
			this.setFilterByKeyAndValue('search', form.value.search);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			console.log(this.items);
			this.filters = data[1];
			// countries
			const countries = this.filters.country.options.slice().map(x => ({ id: x.value, name: x.label }));
			countries.unshift({ id: null, name: 'select' }); // , // LabelPipe.transform('select')
			controls.country.options = countries;
			// categories
			const categories = this.filters.category.options.slice().map(x => ({ id: x.value, name: x.label }));
			categories.unshift({ id: null, name: 'select' }); // , // LabelPipe.transform('select')
			controls.category.options = categories;
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			StoreLocatorService.all$(),
			StoreLocatorService.filters$(),
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
								return item.country && item.country.id === value;
							case 'category':
								return item.category && item.category.id === value;
							case 'search':
								return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									// item.address.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									item.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									item.country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
							default:
						}
					};
			}
		});
		this.filterService = filterService;
		this.filters = filterService.filters;
		const country = this.filters.country.values.length ? this.filters.country.values[0] : null;
		const category = this.filters.category.values.length ? this.filters.category.values[0] : null;
		const search = this.filters.search.values.length ? this.filters.search.values[0] : null;
		this.form.patch({ country, category, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.visibleItems = filteredItems.slice(0, Math.min(12, filteredItems.length));
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('StoreLocatorComponent.filteredItems', filteredItems.length);
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
		// console.log('StoreLocatorComponent.onSearch', this.form.value);
		this.setFilterByKeyAndValue('country', this.form.value.country);
		this.setFilterByKeyAndValue('category', this.form.value.category);
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

StoreLocatorComponent.meta = {
	selector: '[store-locator]',
};
