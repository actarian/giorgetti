import { ControlComponent } from './control.component';

export class ControlEmailComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
	}

}

ControlEmailComponent.meta = {
	selector: '[control-email]',
	inputs: ['control', 'label'],
	template: /* html */ `
		<div class="group--form" [class]="{ required: control.validators.length }">
			<label [labelFor]="control.name"><span [innerHTML]="label"></span> <span class="required__sign">*</span></label>
			<input [id]="control.name" type="text" class="control--text" [formControl]="control" [placeholder]="label" required email />
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
