import { getContext } from 'rxcomp';
import { SwiperDirective } from '../../core/swiper/swiper.directive';

export class SwiperProductsPropositionDirective extends SwiperDirective {

	onInit() {
		this.options = {
			slidesPerView: 3,
			spaceBetween: 40,
			speed: 600,
			centeredSlides: false,
			loop: false,
			loopAdditionalSlides: 100,
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
		const { node } = getContext(this);
		const target = node.querySelector('.swiper-container');
		this.init_(target);
		// console.log('SwiperProductsPropositionDirective.onInit');
	}

}

SwiperProductsPropositionDirective.meta = {
	selector: '[swiper-products-proposition]'
};
