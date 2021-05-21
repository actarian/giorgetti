import { Component } from 'rxcomp';
import { FormControl, FormGroup, Validators } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../core/filter/filter-item';
import { FilterService } from '../../core/filter/filter.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { ProjectsService } from './projects.service';

export class ProjectsComponent extends Component {

	onInit() {
		this.items = [];
		this.filteredItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			category: new FormControl(null, [Validators.RequiredValidator()]),
			search: new FormControl(null, [Validators.RequiredValidator()]),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('ProjectsComponent.changes$', form.value);
			this.setFilterByKeyAndValue('category', form.value.category);
			this.setFilterByKeyAndValue('search', form.value.search);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			this.filters = data[1];
			const options = this.filters.category.options.slice().map(x => ({ id: x.value, name: x.label }));
			options.unshift({ id: null, name: 'select' }); // , // LabelPipe.transform('select')
			controls.category.options = options;
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			ProjectsService.all$(),
			ProjectsService.filters$(),
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
							case 'category':
								return item.category.id === value;
							case 'search':
								return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
									item.country.toLowerCase().indexOf(value.toLowerCase()) !== -1
							default:
							// return item.features.indexOf(value) !== -1;
						}
					};
			}
		});
		this.filterService = filterService;
		this.filters = filterService.filters;
		const category = this.filters.category.values.length ? this.filters.category.values[0] : null;
		const search = this.filters.search.values.length ? this.filters.search.values[0] : null;
		this.form.patch({ category, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('ProjectsComponent.filteredItems', filteredItems.length);
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
		// console.log('ProjectsComponent.onSearch', this.form.value);
		this.setFilterByKeyAndValue('category', this.form.value.category);
		this.setFilterByKeyAndValue('search', this.form.value.search);
	}

	clearFilter(event, filter) {
		event.preventDefault();
		event.stopImmediatePropagation();
		filter.clear();
		this.pushChanges();
	}
}

ProjectsComponent.meta = {
	selector: '[projects]',
};
