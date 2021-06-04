import { Module } from 'rxcomp';
import { MapComponent } from '../partials/map/map.component';
import { SwiperGalleryDirective } from '../partials/swiper-gallery/swiper-gallery.directive';
import { SwiperHomepageDirective } from '../partials/swiper-homepage/swiper-homepage.directive';
import { SwiperNewsPropositionDirective } from '../partials/swiper-news-proposition/swiper-news-proposition.directive';
import { SwiperProductsPropositionDirective } from '../partials/swiper-products-proposition/swiper-products-proposition.directive';
import { SwiperProjectsPropositionDirective } from '../partials/swiper-projects-proposition/swiper-projects-proposition.directive';
import { HeaderComponent } from './header/header.component';
import { MenuDirective } from './menu/menu.directive';
import { NewsletterPropositionComponent } from './newsletter-proposition/newsletter-proposition.component';
import { SubmenuDirective } from './submenu/submenu.directive';
import { TreeComponent } from './tree/tree.component';
import { UserForgotComponent } from './user/user-forgot.component';
import { UserModalComponent } from './user/user-modal.component';
import { UserSigninComponent } from './user/user-signin.component';
import { UserSignupComponent } from './user/user-signup.component';
import { UserComponent } from './user/user.component';

const factories = [
	HeaderComponent,
	MapComponent,
	MenuDirective,
	NewsletterPropositionComponent,
	SubmenuDirective,
	SwiperGalleryDirective,
	SwiperHomepageDirective,
	SwiperNewsPropositionDirective,
	SwiperProductsPropositionDirective,
	SwiperProjectsPropositionDirective,
	TreeComponent,
	UserComponent,
	UserForgotComponent,
	UserModalComponent,
	UserSigninComponent,
	UserSignupComponent,
];

const pipes = [
];

export class SharedModule extends Module { }

SharedModule.meta = {
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