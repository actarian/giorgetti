import { getContext } from 'rxcomp';
import { fromEvent, merge, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ControlComponent } from './control.component';

export class ControlAutocompleteComponent extends ControlComponent {

	onInit() {
		super.onInit();
		const { node } = getContext(this);
		this.input = node.querySelector('input');
		this.disabled = this.disabled || false;
		this.items = [];
		this.control.changes$.pipe(
			tap(value => {
				this.setInputValue(value);
			}),
			takeUntil(this.unsubscribe$)
		).subscribe();
		this.query$().pipe(
			switchMap(query => {
				if (typeof this.source === 'function') {
					return this.source(query);
				} else {
					return of([]);
				}
			}),
			tap(items => {
				this.items = items;
				this.pushChanges();
			}),
			takeUntil(this.unsubscribe$)
		).subscribe();
	}

	query$() {
		const input = this.input;
		return merge(
			fromEvent(input, 'input'),
			fromEvent(input, 'change'),
		).pipe(
			map(event => {
				const value = input.value === '' ? null : input.value;
				// console.log('ControlAutocompleteComponent.query$', value);
				return value;
			}),
			distinctUntilChanged(),
		);
	}

	setInputValue(value) {
		const input = this.input;
		input.value = value ? value.name : null;
	}

	setOption(item) {
		// console.log('setOption', item);
		let value = item.id;
		this.control.value = item;
		this.items = [];
		this.pushChanges();
		this.change.next(item);
	}

	onClick(event) {
		this.setInputValue(null);
	}

	onClickOutside(event) {
		if (!this.control.value) {
			this.setInputValue(null);
		}
		this.items = [];
		this.pushChanges();
	}

	onReset(event) {
		this.control.value = null;
		this.change.next(null);
		if (this.items.length) {
			this.items = [];
			this.pushChanges();
		}
	}

}

ControlAutocompleteComponent.meta = {
	selector: '[control-autocomplete]',
	outputs: ['change'],
	inputs: ['control', 'label', 'disabled', 'source'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }" (click)="onClick($event)">
			<label [labelFor]="uniqueId"><span [innerHTML]="label"></span> <span class="required__sign">*</span></label>
			<input [id]="uniqueId" type="text" class="control--text" [placeholder]="label" [disabled]="disabled" />
			<button type="button" class="btn--reset" (click)="onReset($event)" *if="control.value"><svg class="close-sm"><use xlink:href="#close-sm"></use></svg></button>
			<!-- <svg class="caret-down"><use xlink:href="#caret-down"></use></svg> -->
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
		<div class="dropdown" [class]="{ dropped: items.length }" (clickOutside)="onClickOutside($event)">
			<div class="category" [innerHTML]="label"></div>
			<ul class="nav--dropdown">
				<li (click)="setOption(item)" [class]="{ empty: item.id == null }" *for="let item of items">
					<span [innerHTML]="item.name | label"></span>
				</li>
			</ul>
		</div>
	`
};
