import { SwiperDirective } from '../../core/swiper/swiper.directive';

export class SwiperHomepageDirective extends SwiperDirective {

	onInit() {
		this.options = {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 600,
			keyboardControl: true,
			mousewheelControl: false,
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		};
		this.init_();
		// console.log('SwiperHomepageDirective.onInit');
	}

}

SwiperHomepageDirective.meta = {
	selector: '[swiper-homepage]'
};
