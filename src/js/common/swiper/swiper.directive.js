import { Component, getContext } from 'rxcomp';
import { Subject } from 'rxjs';

export class SwiperDirective extends Component {

	onInit() {
		this.options = {
			slidesPerView: 'auto',
			spaceBetween: 0,
			centeredSlides: true,
			speed: 600,
			autoplay: {
				delay: 5000,
			},
			keyboardControl: true,
			mousewheelControl: false,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true,
			},
		};
		this.init_();
	}

	get enabled() {
		return !window.matchMedia('print').matches;
	}

	onChanges() {
		this.swiperInitOrUpdate_();
	}

	onDestroy() {
		this.removeListeners_();
		this.swiperDestroy_();
	}

	onBeforePrint() {
		this.swiperDestroy_();
	}

	slideToIndex(index) {
		// console.log('SwiperDirective.slideToIndex', index);
		if (this.swiper) {
			this.swiper.slideTo(index);
		}
	}

	hasPrev() {
		const swiper = this.swiper;
		if (swiper) {
			// console.log('SwiperDirective.hasPrev', swiper.activeIndex, swiper.realIndex, swiper.slides.length);
			if (swiper.activeIndex > 0 && swiper.slides.length > swiper.activeIndex) {
				return true;
			}
		}
	}

	hasNext() {
		const swiper = this.swiper;
		if (swiper) {
			const slidesPerView = swiper.params.slidesPerView === 'auto' ? 1 : (swiper.params.slidesPerView || 1);
			// console.log('SwiperDirective.hasNext', swiper.slides.length, slidesPerView, swiper.activeIndex);
			if (swiper.activeIndex < swiper.slides.length - slidesPerView) {
				return true;
			}
		}
	}

	slidePrev() {
		const swiper = this.swiper;
		if (this.hasPrev()) {
			// console.log('SwiperDirective.slidePrev', swiper.activeIndex, swiper.realIndex, swiper.slides);
			swiper.slideTo(swiper.activeIndex - 1);
		}
	}

	slideNext() {
		const swiper = this.swiper;
		if (this.hasNext()) {
			// console.log('SwiperDirective.slideNext', swiper.activeIndex, swiper.realIndex, swiper.slides);
			swiper.slideTo(swiper.activeIndex + 1);
		}
	}

	init_(target) {
		this.events$ = new Subject();
		if (this.enabled) {
			const { node } = getContext(this);
			target = target || node;
			this.target = target;
			gsap.set(target, { opacity: 0 });
			this.index = 0;
			const on = this.options.on || {};
			on.slideChange = () => {
				const swiper = this.swiper;
				if (swiper) {
					console.log('SwiperDirective.onSlideChange', swiper.activeIndex);
					this.index = swiper.activeIndex;
					this.events$.next(this.index);
					this.pushChanges();
				}
			}
			this.options.on = on;
			this.addListeners_();
		}
	}

	addListeners_() {
		this.onBeforePrint = this.onBeforePrint.bind(this);
		window.addEventListener('beforeprint', this.onBeforePrint);
		/*
		scope.$on('onResize', ($scope) => {
			this.onResize(scope, element, attributes);
		});
		*/
	}

	removeListeners_() {
		window.removeEventListener('beforeprint', this.onBeforePrint);
	}

	swiperInitOrUpdate_() {
		if (this.enabled) {
			const target = this.target;
			let swiper = this.swiper;
			if (swiper) {
				swiper.update();
				// swiper.slideTo(0, 0);
			} else {
				const on = this.options.on || (this.options.on = {});
				const callback = on.init;
				if (!on.init || !on.init.swiperDirectiveInit) {
					on.init = function () {
						gsap.to(target, {
							duration: 0.4,
							opacity: 1,
							ease: Power2.easeOut,
						});
						setTimeout(() => {
							if (typeof callback === 'function') {
								callback.apply(this, [swiper, element, scope]);
							}
						}, 1);
					};
					on.init.swiperDirectiveInit = true;
				}
				gsap.set(target, { opacity: 1 });
				swiper = new Swiper(target, this.options);
				// swiper.slideTo(0, 0);
				// console.log(swiper);
				this.swiper = swiper;
				swiper._opening = true;
				target.classList.add('swiper-init');
			}
			const { node } = getContext(this);
			const images = Array.prototype.slice.call(node.querySelectorAll('img'));
			images.forEach(x => {
				const onLoad = () => {
					x.removeEventListener('load', onLoad);
					if (swiper.activeIndex > 0) {
						console.log('SwiperDirective.imgOnLoad', swiper.activeIndex);
						setTimeout(() => {
							swiper.slideTo(0, 0);
						}, 1);
					}
				};
				x.addEventListener('load', onLoad);
			});
		}
	}

	swiperDestroy_() {
		if (this.swiper) {
			this.swiper.destroy();
		}
	}

}

SwiperDirective.meta = {
	selector: '[swiper]',
	inputs: ['consumer']
};
