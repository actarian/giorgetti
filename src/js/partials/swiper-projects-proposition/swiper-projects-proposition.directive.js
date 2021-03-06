import { getContext } from 'rxcomp';
import { SwiperDirective } from '../../common/swiper/swiper.directive';

export class SwiperProjectsPropositionDirective extends SwiperDirective {

	onInit() {
		const inHomepage = document.querySelector('.main--homepage') != null;
		this.options = {
			slidesPerView: 1.5,
			spaceBetween: 30,
			breakpoints: inHomepage ? {
				768: {
					slidesPerView: 2,
					spaceBetween: 40
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 50
				},
				1440: {
					slidesPerView: 3,
					spaceBetween: 60
				},
				1920: {
					slidesPerView: 3,
					spaceBetween: 70
				}
			} : {
				768: {
					slidesPerView: 2,
					spaceBetween: 40
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 50
				},
				1440: {
					slidesPerView: 4,
					spaceBetween: 60
				},
				1920: {
					slidesPerView: 4,
					spaceBetween: 70
				}
			},
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
		// console.log('SwiperProjectsPropositionDirective.onInit');
	}

}

SwiperProjectsPropositionDirective.meta = {
	selector: '[swiper-projects-proposition]'
};
