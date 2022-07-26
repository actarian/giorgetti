import { getContext } from 'rxcomp';
import { SwiperDirective } from '../../common/swiper/swiper.directive';

export class SwiperHomepageDirective extends SwiperDirective {

	onInit() {
		this.options = {
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 600,
			keyboardControl: true,
			mousewheelControl: false,
			/*
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
				pauseOnMouseEnter: true,
			},
			*/
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		};
		const { node } = getContext(this);
		const target = node.classList.contains('swiper-container') ? node : node.querySelector('.swiper-container');
		this.init_(target);
		// console.log('SwiperHomepageDirective.onInit');
	}

}

SwiperHomepageDirective.meta = {
	selector: '[swiper-homepage]'
};
