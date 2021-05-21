import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from './app.component';
import { DropdownItemDirective } from './core/dropdown/dropdown-item.directive';
import { DropdownDirective } from './core/dropdown/dropdown.directive';
import { EnvPipe } from './core/env/env.pipe';
import { FlagPipe } from './core/flag/flag.pipe';
import { ControlCustomSelectComponent } from './core/forms/control-custom-select.component';
import { ControlEmailComponent } from './core/forms/control-email.component';
import { ControlSearchComponent } from './core/forms/control-search.component';
import { HtmlPipe } from './core/html/html.pipe';
import { LabelPipe } from './core/label/label.pipe';
import { LocomotiveScrollDirective } from './core/locomotive-scroll/locomotive-scroll.directive';
import { SlugPipe } from './core/slug/slug.pipe';
import { SwiperDirective } from './core/swiper/swiper.directive';
import { TitleDirective } from './core/title/title.directive';
import { HeaderComponent } from './pages/header/header.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsletterPropositionComponent } from './pages/newsletter/newsletter-proposition.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SwiperGalleryDirective } from './pages/swiper-gallery/swiper-gallery.directive';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
	],
	declarations: [
		// ControlCheckboxComponent,
		ControlCustomSelectComponent,
		ControlEmailComponent,
		// ControlLinkComponent,
		// ControlNumberComponent,
		// ControlPasswordComponent,
		// ControlsComponent,
		// ControlSelectComponent,
		ControlSearchComponent,
		// ControlTextareaComponent,
		// ControlTextComponent,
		// DisabledDirective,
		// DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		// DropdownItemDirective,
		EnvPipe,
		// ErrorsComponent,
		FlagPipe,
		HeaderComponent,
		HtmlPipe,
		// IdDirective,
		LabelPipe,
		// LanguageComponent,
		// LazyDirective,
		LocomotiveScrollDirective,
		// ModalComponent,
		// ModalOutletComponent,
		NewsComponent,
		NewsletterPropositionComponent,
		ProjectsComponent,
		SlugPipe,
		// SvgIconStructure,
		SwiperDirective,
		SwiperGalleryDirective,
		TitleDirective,
		// UploadItemComponent,
		// ValueDirective,
		// VirtualStructure
	],
	bootstrap: AppComponent,
};
