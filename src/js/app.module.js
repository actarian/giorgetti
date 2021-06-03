import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from './app.component';
import { DropdownItemDirective } from './core/dropdown/dropdown-item.directive';
import { DropdownDirective } from './core/dropdown/dropdown.directive';
import { EnvPipe } from './core/env/env.pipe';
import { FlagPipe } from './core/flag/flag.pipe';
import { ControlCheckboxComponent } from './core/forms/control-checkbox.component';
import { ControlCustomSelectComponent } from './core/forms/control-custom-select.component';
import { ControlEmailComponent } from './core/forms/control-email.component';
import { ControlPasswordComponent } from './core/forms/control-password.component';
import { ControlSearchComponent } from './core/forms/control-search.component';
import { ControlTextComponent } from './core/forms/control-text.component';
import { ControlTextareaComponent } from './core/forms/control-textarea.component';
import { ErrorsComponent } from './core/forms/errors.component';
import { TestComponent } from './core/forms/test.component';
import { HtmlPipe } from './core/html/html.pipe';
import { IdDirective } from './core/id/id.directive';
import { LabelForDirective } from './core/label-for/label-for.directive';
import { LabelPipe } from './core/label/label.pipe';
import { LocomotiveScrollDirective } from './core/locomotive-scroll/locomotive-scroll.directive';
import { ScrollDirective } from './core/locomotive-scroll/scroll.directive';
import { ModalOutletComponent } from './core/modal/modal-outlet.component';
import { SlugPipe } from './core/slug/slug.pipe';
import { SwiperDirective } from './core/swiper/swiper.directive';
import { ThronComponent } from './core/thron/thron.component';
import { TitleDirective } from './core/title/title.directive';
import { AmbienceComponent } from './pages/ambience/ambience.component';
import { AteliersAndStoresComponent } from './pages/ateliers-and-stores/ateliers-and-stores.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { HeaderComponent } from './pages/header/header.component';
import { MapComponent } from './pages/map/map.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { MenuDirective } from './pages/menu/menu.directive';
import { NewsComponent } from './pages/news/news.component';
import { NewsletterPropositionComponent } from './pages/newsletter/newsletter-proposition.component';
import { ProductsConfigureComponent } from './pages/products-configure/products-configure.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ReservedAreaComponent } from './pages/reserved-area/reserved-area.component';
import { StoreLocatorComponent } from './pages/store-locator/store-locator.component';
import { SubmenuDirective } from './pages/submenu/submenu.directive';
import { SwiperGalleryDirective } from './pages/swiper-gallery/swiper-gallery.directive';
import { SwiperHomepageDirective } from './pages/swiper-homepage/swiper-homepage.directive';
import { SwiperNewsPropositionDirective } from './pages/swiper-news-proposition/swiper-news-proposition.directive';
import { SwiperProductsPropositionDirective } from './pages/swiper-products-proposition/swiper-products-proposition.directive';
import { SwiperProjectsPropositionDirective } from './pages/swiper-projects-proposition/swiper-projects-proposition.directive';
import { ToggleDirective } from './pages/toggle/toggle.directive';
import { TreeComponent } from './pages/tree/tree.component';
import { UserForgotComponent } from './pages/user/user-forgot.component';
import { UserModalComponent } from './pages/user/user-modal.component';
import { UserSigninComponent } from './pages/user/user-signin.component';
import { UserSignupComponent } from './pages/user/user-signup.component';
import { UserComponent } from './pages/user/user.component';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
	],
	declarations: [
		AmbienceComponent,
		AteliersAndStoresComponent,
		ContactsComponent,
		ControlCheckboxComponent,
		ControlCustomSelectComponent,
		ControlEmailComponent,
		ControlPasswordComponent,
		// ControlSelectComponent,
		ControlSearchComponent,
		ControlTextareaComponent,
		ControlTextComponent,
		DesignersComponent,
		// DisabledDirective,
		// DropDirective,
		DropdownDirective,
		DropdownItemDirective,
		// DropdownItemDirective,
		EnvPipe,
		ErrorsComponent,
		FlagPipe,
		HeaderComponent,
		HtmlPipe,
		IdDirective,
		LabelForDirective,
		LabelPipe,
		// LanguageComponent,
		// LazyDirective,
		LocomotiveScrollDirective,
		MapComponent,
		MaterialsComponent,
		MenuDirective,
		// ModalComponent,
		ModalOutletComponent,
		NewsComponent,
		NewsletterPropositionComponent,
		ProductsComponent,
		ProductsConfigureComponent,
		ProductsDetailComponent,
		ProjectsComponent,
		ReservedAreaComponent,
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
		TestComponent,
		ThronComponent,
		TitleDirective,
		ToggleDirective,
		TreeComponent,
		// UploadItemComponent,
		UserComponent,
		UserForgotComponent,
		UserModalComponent,
		UserSigninComponent,
		UserSignupComponent,
		// ValueDirective,
		// VirtualStructure
	],
	bootstrap: AppComponent,
};
