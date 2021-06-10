import { Component, getContext } from 'rxcomp';
import { FormControl, FormGroup } from 'rxcomp-form';
import { combineLatest } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FilterMode } from '../../common/filter/filter-item';
import { FilterService } from '../../common/filter/filter.service';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalService } from '../../common/modal/modal.service';
import { FormService } from '../../controls/form.service';
import { environment } from '../../environment';
import { MaterialsService } from './materials.service';

export class MaterialsComponent extends Component {

	onInit() {
		this.categories = [];
		this.selectedItem = null;
		this.items = [];
		this.filteredItems = [];
		this.visibleItems = [];
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
		this.categories = this.filters.category.options;
		const category = this.filters.category.values.length ? this.filters.category.values[0] : null;
		this.form.patch({ category, search });
		filterService.items$(items).pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(filteredItems => {
			this.filteredItems = filteredItems;
			this.visibleItems = this.filteredItems.slice(0, Math.min(16, this.filteredItems.length));
			this.pushChanges();
			LocomotiveScrollService.update();
			// console.log('MaterialsComponent.filteredItems', filteredItems.length);
		});
	}

	showMore(event) {
		const pageSize = 32;
		if (this.visibleItems.length + pageSize >= this.filteredItems.length) {
			this.visibleItems = this.filteredItems.slice();
		} else {
			this.visibleItems = this.filteredItems.slice(0, Math.min(this.visibleItems.length + pageSize, this.filteredItems.length));
		}
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

	onOpen(item, items) {
		ModalService.open$({ src: environment.template.modal.materialsModal, data: { item, items } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('MaterialComponent.onOpen', event);
			/*
			if (event instanceof ModalResolveEvent) {
				window.location.href = environment.slug.reservedArea;
			}
			*/
		});
	}

	setCategory(category, event) {
		if (event) {
			event.preventDefault();
		}
		this.controls.category.value = category.value;
		setTimeout(() => {
			LocomotiveScrollService.update();
			this.scrollTo('#category-' + category.value);
		}, 100);
	}

	scrollTo(selector, event) {
		if (event) {
			event.preventDefault();
		}
		const { node } = getContext(this);
		const target = node.querySelector(selector);
		LocomotiveScrollService.scrollTo(target, { offset: - 130 });
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
