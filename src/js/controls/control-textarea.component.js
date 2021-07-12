import { ControlComponent } from './control.component';

export class ControlTextareaComponent extends ControlComponent {

	onInit() {
		this.label = this.label || 'label';
		this.disabled = this.disabled || false;
	}

}

ControlTextareaComponent.meta = {
	selector: '[control-textarea]',
	inputs: ['control', 'label', 'disabled'],
	template: /* html */ `
		<div class="group--form--textarea" [class]="{ required: control.validators.length, disabled: disabled }">
			<label [labelFor]="control.name"><span [innerHTML]="label"></span> <span class="required__sign">*</span></label>
			<textarea [id]="control.name" class="control--text" [formControl]="control" [placeholder]="label" [innerHTML]="label" rows="4" [disabled]="disabled"></textarea>
			<span class="required__badge" [innerHTML]="'required' | label"></span>
		</div>
		<errors-component [control]="control"></errors-component>
	`
};
