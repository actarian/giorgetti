import { Module } from 'rxcomp';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { DatePipe } from './date/date.pipe';
import { DownloadDirective } from './download/download.directive';
import { DropdownItemDirective } from './dropdown/dropdown-item.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { EnvPipe } from './env/env.pipe';
import { FilterComponent } from './filter/filter.component';
import { FlagPipe } from './flag/flag.pipe';
import { HighlightPipe } from './highlight/highlight.pipe';
import { HtmlPipe } from './html/html.pipe';
import { IdDirective } from './id/id.directive';
import { LabelForDirective } from './label-for/label-for.directive';
import { LabelPipe } from './label/label.pipe';
import { LocomotiveScrollStickyDirective } from './locomotive-scroll/locomotive-scroll-sticky.directive';
import { LocomotiveScrollToDirective } from './locomotive-scroll/locomotive-scroll-to.directive';
import { LocomotiveScrollDirective } from './locomotive-scroll/locomotive-scroll.directive';
import { ScrollDirective } from './locomotive-scroll/scroll.directive';
import { ModalOutletComponent } from './modal/modal-outlet.component';
import { NumberPipe } from './number/number.pipe';
import { ShareDirective } from './share/share.directive';
import { SlugPipe } from './slug/slug.pipe';
import { SvgIconStructure } from './svg/svg-icon.structure';
import { SwiperDirective } from './swiper/swiper.directive';
import { ThronComponent } from './thron/thron.component';
import { TitleDirective } from './title/title.directive';

const factories = [
	ClickOutsideDirective,
	DownloadDirective,
	// DropDirective,
	DropdownDirective,
	DropdownItemDirective,
	// DropdownItemDirective,
	FilterComponent,
	IdDirective,
	LabelForDirective,
	// LanguageComponent,
	// LazyDirective,
	LocomotiveScrollDirective,
	LocomotiveScrollStickyDirective,
	LocomotiveScrollToDirective,
	// ModalComponent,
	ModalOutletComponent,
	ScrollDirective,
	ShareDirective,
	SvgIconStructure,
	SwiperDirective,
	ThronComponent,
	TitleDirective,
	// UploadItemComponent,
	// VirtualStructure
];

const pipes = [
	DatePipe,
	EnvPipe,
	FlagPipe,
	HighlightPipe,
	HtmlPipe,
	LabelPipe,
	NumberPipe,
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
