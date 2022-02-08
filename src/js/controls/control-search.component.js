import { getContext } from 'rxcomp';
import { ControlComponent } from './control.component';

export class ControlSearchComponent extends ControlComponent {

	onInit() {
		super.onInit();
		this.disabled = this.disabled || false;
	}

	onFocus(event) {
		const { node } = getContext(this);
		const input = node.querySelector('.control--text');
		if (input) {
			input.setSelectionRange(0, 1000);
			input.focus();
		}
	}

}

ControlSearchComponent.meta = {
	selector: '[control-search]',
	inputs: ['control', 'label', 'disabled'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length, disabled: disabled }">
			<svg class="search" (click)="onFocus($event)"><use xlink:href="#search"></use></svg>
			<input type="text" class="control--text" [formControl]="control" [placeholder]="label" [disabled]="disabled" />
		</div>
	`
};
