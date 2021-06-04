import { Module } from 'rxcomp';
import { DropdownItemDirective } from './dropdown/dropdown-item.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { EnvPipe } from './env/env.pipe';
import { FlagPipe } from './flag/flag.pipe';
import { ControlCheckboxComponent } from './forms/control-checkbox.component';
import { ControlCustomSelectComponent } from './forms/control-custom-select.component';
import { ControlEmailComponent } from './forms/control-email.component';
import { ControlPasswordComponent } from './forms/control-password.component';
import { ControlSearchComponent } from './forms/control-search.component';
import { ControlTextComponent } from './forms/control-text.component';
import { ControlTextareaComponent } from './forms/control-textarea.component';
import { ErrorsComponent } from './forms/errors.component';
import { TestComponent } from './forms/test.component';
import { HtmlPipe } from './html/html.pipe';
import { IdDirective } from './id/id.directive';
import { LabelForDirective } from './label-for/label-for.directive';
import { LabelPipe } from './label/label.pipe';
import { LocomotiveScrollDirective } from './locomotive-scroll/locomotive-scroll.directive';
import { ScrollDirective } from './locomotive-scroll/scroll.directive';
import { ModalOutletComponent } from './modal/modal-outlet.component';
import { SlugPipe } from './slug/slug.pipe';
import { SwiperDirective } from './swiper/swiper.directive';
import { ThronComponent } from './thron/thron.component';
import { TitleDirective } from './title/title.directive';

const factories = [
	ControlCheckboxComponent,
	ControlCustomSelectComponent,
	ControlEmailComponent,
	ControlPasswordComponent,
	// ControlSelectComponent,
	ControlSearchComponent,
	ControlTextareaComponent,
	ControlTextComponent,
	// DisabledDirective,
	// DropDirective,
	DropdownDirective,
	DropdownItemDirective,
	// DropdownItemDirective,
	ErrorsComponent,
	IdDirective,
	LabelForDirective,
	// LanguageComponent,
	// LazyDirective,
	LocomotiveScrollDirective,
	// ModalComponent,
	ModalOutletComponent,
	ScrollDirective,
	// SvgIconStructure,
	SwiperDirective,
	TestComponent,
	ThronComponent,
	TitleDirective,
	// UploadItemComponent,
	// ValueDirective,
	// VirtualStructure
];

const pipes = [
	EnvPipe,
	FlagPipe,
	HtmlPipe,
	LabelPipe,
	SlugPipe,
];

export class CommonModule extends Module { }

CommonModule.meta = {
	imports: [
	],
	declarations: [
		...factories,
		...pipes,
	],
	exports: [
		...factories,
		...pipes,
	],
};
