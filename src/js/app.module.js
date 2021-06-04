import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from './app.component';
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
import { TreeComponent } from './pages/tree/tree.component';
import { UserForgotComponent } from './pages/user/user-forgot.component';
import { UserModalComponent } from './pages/user/user-modal.component';
import { UserSigninComponent } from './pages/user/user-signin.component';
import { UserSignupComponent } from './pages/user/user-signup.component';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from './shared/shared.module';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
		SharedModule,
	],
	declarations: [
		AmbienceComponent,
		AteliersAndStoresComponent,
		ContactsComponent,
		DesignersComponent,
		HeaderComponent,
		MapComponent,
		MaterialsComponent,
		MenuDirective,
		NewsComponent,
		NewsletterPropositionComponent,
		ProductsComponent,
		ProductsConfigureComponent,
		ProductsDetailComponent,
		ProjectsComponent,
		ReservedAreaComponent,
		StoreLocatorComponent,
		SubmenuDirective,
		SwiperHomepageDirective,
		SwiperNewsPropositionDirective,
		SwiperProductsPropositionDirective,
		SwiperProjectsPropositionDirective,
		SwiperGalleryDirective,
		TreeComponent,
		UserComponent,
		UserForgotComponent,
		UserModalComponent,
		UserSigninComponent,
		UserSignupComponent,
	],
	bootstrap: AppComponent,
};
