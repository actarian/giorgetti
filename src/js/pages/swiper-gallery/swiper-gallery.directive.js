import { SwiperDirective } from '../../core/swiper/swiper.directive';

export class SwiperGalleryDirective extends SwiperDirective {

	onInit() {
		this.options = {
			slidesPerView: 1,
			spaceBetween: 40,
			speed: 600,
			centeredSlides: true,
			loop: true,
			loopAdditionalSlides: 3,
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
		// console.log('SwiperGalleryDirective.onInit');
	}

}

SwiperGalleryDirective.meta = {
	selector: '[swiper-gallery]'
};
