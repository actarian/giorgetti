import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../core/filter/filter-item';
import { FilterService } from '../../core/filter/filter.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { AteliersAndStoresService } from './ateliers-and-stores.service';

export class AteliersAndStoresComponent extends Component {

	onInit() {
		this.types = {
			Atelier: 1,
			Store: 2,
		};
		this.items = [];
		this.filteredItems = [];
		this.filteredAteliers = [];
		this.filteredStores = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			country: new FormControl(null, [Validators.RequiredValidator()]),
			search: new FormControl(null, [Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('AteliersAndStoresComponent.changes$', form.value);
			this.setFilterByKeyAndValue('country', form.value.country);
			this.setFilterByKeyAndValue('search', form.value.search);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			this.filters = data[1];
			const options = this.filters.country.options.slice().map(x => ({ id: x.value, name: x.label }));
			options.unshift({ id: null, name: 'select' }); // , // LabelPipe.transform('select')
			controls.country.options = options;
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			AteliersAndStoresService.all$(),
			AteliersAndStoresService.filters$(),
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
								return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 || item.country.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
			this.filteredAteliers = filteredItems.filter(x => x.type === this.types.Atelier);
			this.filteredStores = filteredItems.filter(x => x.type === this.types.Store);
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('AteliersAndStoresComponent.filteredItems', filteredItems.length);
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
		this.pushChanges();
	}

	onSearch(model) {
		// console.log('AteliersAndStoresComponent.onSearch', this.form.value);
		this.setFilterByKeyAndValue('country', this.form.value.country);
		this.setFilterByKeyAndValue('search', this.form.value.search);
	}

	clearFilter(event, filter) {
		event.preventDefault();
		event.stopImmediatePropagation();
		filter.clear();
		this.pushChanges();
	}
}

AteliersAndStoresComponent.meta = {
	selector: '[ateliers-and-stores]',
};
