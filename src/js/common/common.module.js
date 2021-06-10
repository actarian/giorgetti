import { Module } from 'rxcomp';
import { DownloadDirective } from './download/download.directive';
import { DropdownItemDirective } from './dropdown/dropdown-item.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { EnvPipe } from './env/env.pipe';
import { FlagPipe } from './flag/flag.pipe';
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
	DownloadDirective,
	// DropDirective,
	DropdownDirective,
	DropdownItemDirective,
	// DropdownItemDirective,
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
	ThronComponent,
	TitleDirective,
	// UploadItemComponent,
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
