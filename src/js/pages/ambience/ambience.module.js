import { CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import { HeaderComponent } from '../header/header.component';
import { MenuDirective } from '../menu/menu.directive';
import { NewsletterPropositionComponent } from '../newsletter/newsletter-proposition.component';
import { SharedModule } from '../shared/shared.module';
import { SubmenuDirective } from '../submenu/submenu.directive';
import { SwiperGalleryDirective } from '../swiper-gallery/swiper-gallery.directive';
import { UserForgotComponent } from '../user/user-forgot.component';
import { UserModalComponent } from '../user/user-modal.component';
import { UserSigninComponent } from '../user/user-signin.component';
import { UserSignupComponent } from '../user/user-signup.component';
import { AmbienceComponent } from './ambience.component';
import { AppComponent } from './app.component';

export class AppModule extends Module { }

AppModule.meta = {
	imports: [
		CoreModule,
		FormModule,
		SharedModule,
	],
	declarations: [
		AmbienceComponent,
		HeaderComponent,
		MenuDirective,
		NewsletterPropositionComponent,
		SubmenuDirective,
		SwiperGalleryDirective,
		UserForgotComponent,
		UserModalComponent,
		UserSigninComponent,
		UserSignupComponent,
	],
	bootstrap: AppComponent,
};
