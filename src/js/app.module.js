import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { ControlsModule } from './controls/controls.module';
import { AmbienceComponent } from './pages/ambience/ambience.component';
import { AteliersAndStoresComponent } from './pages/ateliers-and-stores/ateliers-and-stores.component';
import { CareersModalComponent } from './pages/careers/careers-modal.component';
import { CareersComponent } from './pages/careers/careers.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DealersComponent } from './pages/dealers/dealers.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { GenericModalComponent } from './pages/generic/generic-modal.component';
import { MagazineRequestModalComponent } from './pages/magazine-request/magazine-request-modal.component';
import { MagazineRequestPropositionComponent } from './pages/magazine-request/magazine-request-proposition.component';
import { MagazineRequestComponent } from './pages/magazine-request/magazine-request.component';
import { MagazineComponent } from './pages/magazine/magazine.component';
import { MarketPropositionModalComponent } from './pages/market-proposition/market-proposition-modal.component';
import { MarketsAndLanguagesModalComponent } from './pages/markets-and-languages/markets-and-languages-modal.component';
import { MaterialsModalComponent } from './pages/materials/materials-modal.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsletterComponent } from './pages/newsletter/newsletter.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail.component';
import { OrdersModalComponent } from './pages/orders/orders-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsConfigureComponent } from './pages/products-configure/products-configure.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProjectsRegistrationModalComponent } from './pages/projects-registration/projects-registration-modal.component';
import { ProjectsRegistrationComponent } from './pages/projects-registration/projects-registration.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ReservedAreaComponent } from './pages/reserved-area/reserved-area.component';
import { StoreLocatorComponent } from './pages/store-locator/store-locator.component';
import { SharedModule } from './shared/shared.module';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
		CommonModule,
		ControlsModule,
		SharedModule,
	],
	declarations: [
		AmbienceComponent,
		AteliersAndStoresComponent,
		CareersComponent,
		CareersModalComponent,
		CartComponent,
		ContactsComponent,
		DealersComponent,
		DesignersComponent,
		GenericModalComponent,
		MagazineComponent,
		MagazineRequestComponent,
		MagazineRequestModalComponent,
		MagazineRequestPropositionComponent,
		MarketPropositionModalComponent,
		MarketsAndLanguagesModalComponent,
		MaterialsComponent,
		MaterialsModalComponent,
		NewsComponent,
		NewsletterComponent,
		OrdersComponent,
		OrdersDetailComponent,
		OrdersModalComponent,
		ProductsComponent,
		ProductsConfigureComponent,
		ProductsDetailComponent,
		ProjectsComponent,
		ProjectsRegistrationComponent,
		ProjectsRegistrationModalComponent,
		ReservedAreaComponent,
		StoreLocatorComponent,
	],
	bootstrap: AppComponent,
};
