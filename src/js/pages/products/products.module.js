import { Browser, CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { AppComponent } from '../../app.component';
import { CommonModule } from '../../common/common.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
		CommonModule,
		SharedModule,
	],
	declarations: [
		ProductsComponent,
	],
	bootstrap: AppComponent,
};

Browser.bootstrap(AppModule);
