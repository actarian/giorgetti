import { Component } from 'rxcomp';
import { FormControl, FormGroup } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../common/filter/filter-item';
import { FilterService } from '../../common/filter/filter.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { FormService } from '../../controls/form.service';
import { ProductsService } from './products.service';

export class ProductsComponent extends Component {

	onInit() {
		this.categoryId = this.categoryId || null;
		this.items = [];
		this.filteredItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			category: new FormControl(null),
			ambience: new FormControl(null),
			material: new FormControl(null),
			designer: new FormControl(null),
			search: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			// console.log('ProductsComponent.changes$', form.value);
			this.setFilterByKeyAndValue('category', form.value.category);
			this.setFilterByKeyAndValue('ambience', form.value.ambience);
			this.setFilterByKeyAndValue('material', form.value.material);
			this.setFilterByKeyAndValue('designer', form.value.designer);
			this.setFilterByKeyAndValue('search', form.value.search);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			this.filters = data[1];
			controls.category.options = FormService.toSelectOptions(this.filters.category.options);
			controls.ambience.options = FormService.toSelectOptions(this.filters.ambience.options);
			controls.material.options = FormService.toSelectOptions(this.filters.material.options);
			controls.designer.options = FormService.toSelectOptions(this.filters.designer.options);
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			ProductsService.all$(),
			ProductsService.filters$(),
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
							case 'ambience':
								return item.ambience.id === value;
							case 'material':
								return item.materials.indexOf(value) !== -1;
							case 'designer':
								return item.designers.indexOf(value) !== -1;
							case 'search':
								return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
							default:
						}
					};
			}
		});
		this.filterService = filterService;
		this.filters = filterService.filters;
		const category = this.categoryId ? this.categoryId : (this.filters.category.values.length ? this.filters.category.values[0] : null);
		const ambience = this.filters.ambience.values.length ? this.filters.ambience.values[0] : null;
		const material = this.filters.material.values.length ? this.filters.material.values[0] : null;
		const designer = this.filters.designer.values.length ? this.filters.designer.values[0] : null;
		const search = this.filters.search.values.length ? this.filters.search.values[0] : null;
		this.form.patch({ category, ambience, material, designer, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('ProductsComponent.filteredItems', filteredItems.length);
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
		// console.log('ProductsComponent.onSearch', this.form.value);
		this.setFilterByKeyAndValue('category', this.form.value.category);
		this.setFilterByKeyAndValue('ambience', this.form.value.ambience);
		this.setFilterByKeyAndValue('material', this.form.value.material);
		this.setFilterByKeyAndValue('designer', this.form.value.designer);
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

ProductsComponent.meta = {
	selector: '[products]',
	inputs: ['categoryId'],
};
