import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../core/filter/filter-item';
import { FilterService } from '../../core/filter/filter.service';
import { FormService } from '../../core/forms/form.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { MaterialsService } from './materials.service';

export class MaterialsComponent extends Component {

	onInit() {
		this.selectedItem = null;
		this.items = [];
		this.filteredItems = [];
		this.filters = {};
		const form = this.form = new FormGroup({
			category: new FormControl(null),
		});
		const controls = this.controls = form.controls;
		form.changes$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe((_) => {
			this.setFilterByKeyAndValue('category', form.value.category);
			this.pushChanges();
		});
		this.load$().pipe(
			first(),
		).subscribe(data => {
			this.items = data[0];
			this.filters = data[1];
			controls.category.options = FormService.toSelectOptions(this.filters.category.options);
			this.onLoad();
			this.pushChanges();
		});
	}

	load$() {
		return combineLatest([
			MaterialsService.all$(),
			MaterialsService.filters$(),
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
							default:
						}
					};
			}
		});
		this.filterService = filterService;
		this.filters = filterService.filters;
		const category = this.filters.category.values.length ? this.filters.category.values[0] : null;
		this.form.patch({ category, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('MaterialsComponent.filteredItems', filteredItems.length);
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

	onToggle(item) {
		this.selectedItem = this.selectedItem === item ? null : item;
		/*
		if (this.selectedItem) {
			const selector = '#cat-' + item.category.id + '-' + item.id;
			this.scrollTo(selector);
		}
		*/
		this.pushChanges();
	}

	scrollTo(selector, event) {
		if (event) {
			event.preventDefault();
		}
		const { node } = getContext(this);
		const target = node.querySelector(selector);
		LocomotiveScrollService.scrollTo(target, { offset: - 160 });
	}

	clearFilter(event, filter) {
		event.preventDefault();
		event.stopImmediatePropagation();
		filter.clear();
		this.pushChanges();
	}
}

MaterialsComponent.meta = {
	selector: '[materials]',
};
