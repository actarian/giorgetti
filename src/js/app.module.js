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
import { ScrollDirective } from './core/locomotive-scroll/scroll.directive';
import { SlugPipe } from './core/slug/slug.pipe';
import { SwiperDirective } from './core/swiper/swiper.directive';
import { ThronComponent } from './core/thron/thron.component';
import { TitleDirective } from './core/title/title.directive';
import { AteliersAndStoresComponent } from './pages/ateliers-and-stores/ateliers-and-stores.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { HeaderComponent } from './pages/header/header.component';
import { MapComponent } from './pages/map/map.component';
import { MenuDirective } from './pages/menu/menu.directive';
import { NewsComponent } from './pages/news/news.component';
import { NewsletterPropositionComponent } from './pages/newsletter/newsletter-proposition.component';
import { ProductsConfigureComponent } from './pages/products-configure/products-configure.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { StoreLocatorComponent } from './pages/store-locator/store-locator.component';
import { SubmenuDirective } from './pages/submenu/submenu.directive';
import { SwiperGalleryDirective } from './pages/swiper-gallery/swiper-gallery.directive';
import { SwiperHomepageDirective } from './pages/swiper-homepage/swiper-homepage.directive';
import { SwiperNewsPropositionDirective } from './pages/swiper-news-proposition/swiper-news-proposition.directive';
import { SwiperProductsPropositionDirective } from './pages/swiper-products-proposition/swiper-products-proposition.directive';
import { SwiperProjectsPropositionDirective } from './pages/swiper-projects-proposition/swiper-projects-proposition.directive';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
	],
	declarations: [
		AteliersAndStoresComponent,
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
		DesignersComponent,
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
		MapComponent,
		MenuDirective,
		// ModalComponent,
		// ModalOutletComponent,
		NewsComponent,
		NewsletterPropositionComponent,
		ProductsConfigureComponent,
		ProductsDetailComponent,
		ProjectsComponent,
		ScrollDirective,
		SlugPipe,
		StoreLocatorComponent,
		SubmenuDirective,
		// SvgIconStructure,
		SwiperDirective,
		SwiperHomepageDirective,
		SwiperNewsPropositionDirective,
		SwiperProductsPropositionDirective,
		SwiperProjectsPropositionDirective,
		SwiperGalleryDirective,
		ThronComponent,
		TitleDirective,
		// UploadItemComponent,
		// ValueDirective,
		// VirtualStructure
	],
	bootstrap: AppComponent,
};
