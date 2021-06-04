import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { AmbienceComponent } from './pages/ambience/ambience.component';
import { AteliersAndStoresComponent } from './pages/ateliers-and-stores/ateliers-and-stores.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DesignersComponent } from './pages/designers/designers.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductsConfigureComponent } from './pages/products-configure/products-configure.component';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ProductsComponent } from './pages/products/products.component';
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
		SharedModule,
	],
	declarations: [
		AmbienceComponent,
		AteliersAndStoresComponent,
		ContactsComponent,
		DesignersComponent,
		MaterialsComponent,
		NewsComponent,
		ProductsComponent,
		ProductsConfigureComponent,
		ProductsDetailComponent,
		ProjectsComponent,
		ReservedAreaComponent,
		StoreLocatorComponent,
	],
	bootstrap: AppComponent,
};
