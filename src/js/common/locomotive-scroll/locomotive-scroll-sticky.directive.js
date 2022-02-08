import { Directive, getContext } from 'rxcomp';
import { takeUntil, tap } from 'rxjs/operators';
import { LocomotiveScrollService } from './locomotive-scroll.service';

export class LocomotiveScrollStickyDirective extends Directive {

	sticked_ = false;
	get sticked() {
		return this.sticked_;
	}
	set sticked(sticked) {
		if (this.sticked_ !== sticked) {
			this.sticked_ = sticked;
			if (this.targetNode) {
				sticked ? this.targetNode.classList.add('sticked') : this.targetNode.classList.remove('sticked');
			}
		}
	}

	onInit() {
		const { node } = getContext(this);
		this.targetNode = (this.target ? (node.querySelector(this.target) || node) : node);
		this.until = this.until ? document.querySelector(this.until) : null;
		this.sticky$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(event => {
			// console.log('LocomotiveScrollStickyDirective', event);
		});
		window.addEventListener("orientationchange", function (event) {
			var width = window.screen.width;			
			var nav = document.querySelector('.nav--secondary');			
			var materials = document.querySelector('.section--materials');
			var secReserved = document.querySelector('.reserved-section--secondary');	
				
			if (materials !== null) {
				if (width < 1024) {
					nav.removeAttribute('style');
					nav.classList.remove('nav-fixed-position');
				} else {
					var footer = document.querySelector('.group--prefooter');
					const headerHeight = document.querySelector('.header').offsetHeight
					var footerOffset = footer.getBoundingClientRect();
					var topFooter = footerOffset.top;
					var materialsOffset = materials.getBoundingClientRect();
					var topMaterials = materialsOffset.top;


					if ((topMaterials - headerHeight) < 0 && (topFooter > 0)) {
						nav.classList.add('nav-fixed-position');
						nav.style.top = headerHeight + 'px';
					} else {
						nav.removeAttribute('style');
						nav.classList.remove('nav-fixed-position');
					}
				}
			} else if (secReserved !== null) {				
				if (width < 1024) {
					nav.removeAttribute('style');
					nav.classList.remove('nav-fixed-position');
				} else {
					var footer = document.querySelector('.group--prefooter');
					const headerHeight = document.querySelector('.header').offsetHeight
					var footerOffset = footer.getBoundingClientRect();
					var topFooter = footerOffset.top;
					var materialsOffset = secReserved.getBoundingClientRect();
					var topMaterials = materialsOffset.top;


					if ((topMaterials - headerHeight) < 0 && (topFooter > 0)) {
						nav.classList.add('nav-fixed-position');
						nav.style.top = headerHeight + 'px';
					} else {
						nav.removeAttribute('style');
						nav.classList.remove('nav-fixed-position');
					}
				}
			}
		});
	}

	isTouchDevice() {
		const userAgent = navigator.userAgent.toLowerCase();
		const isTablet = /(mac|ipad|tablet|(android(?!.*mobile))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
		const isSmartphone = /(ipod|iphone|(android(?!.*mobile))|(windows(?!.*phone)(.*touch)))/.test(userAgent);
		return isTablet || isSmartphone;
	}
	

	isSafari() {
		const isSafari = navigator.vendor.match(/apple/i) &&
			!navigator.userAgent.match(/crios/i) &&
			!navigator.userAgent.match(/fxios/i);
		return isSafari;
	}

	sticky$() {
		const { node } = getContext(this);
		const targetNode = this.targetNode;
		const until = this.until;
		return LocomotiveScrollService.scroll$.pipe(
			tap(event => {					
				if (!this.isTouchDevice() && !this.isSafari()) {					
					const rect = node.getBoundingClientRect();
					let y = 0;
					if (this.bottom) {
						const bottom = window.innerHeight - targetNode.offsetHeight;
						if (window.innerWidth >= 1024 && rect.y > bottom) {
							y = bottom - rect.y;
							this.sticked = true;
						} else {
							this.sticked = false;
						}
					} else {
						const top = event.direction === 'down' ? 80 : 135;
						if (window.innerWidth >= 1024 && rect.y < top) {
							y = top - rect.y;
							if (until) {
								const untilRect = until.getBoundingClientRect();
								const height = untilRect.y - rect.y;
								y = Math.min(height, y);
							}
							this.sticked = true;
						} else {
							this.sticked = false;
						}
					}
					// console.log(rect.height - targetNode.offsetHeight);
					gsap.set(targetNode, { y });

				} else {					
					var body = document.querySelector('body');
					body.addEventListener('scroll', function (event) {

						var nav = document.querySelector('.nav--secondary');
						var materials = document.querySelector('.section--materials');
						var secReserved = document.querySelector('.reserved-section--secondary');

						if (materials !== null) {
							if (window.innerWidth >= 1024) {
								var footer = document.querySelector('.group--prefooter');
								const headerHeight = document.querySelector('.header').offsetHeight
								var footerOffset = footer.getBoundingClientRect();
								var topFooter = footerOffset.top;
								var materialsOffset = materials.getBoundingClientRect();
								var topMaterials = materialsOffset.top;

								if ((topMaterials - headerHeight) < 0 && (topFooter > 0)) {
									nav.classList.add('nav-fixed-position');
									nav.style.top = headerHeight + 'px';
								} else {
									nav.removeAttribute('style');
									nav.classList.remove('nav-fixed-position');
								}
							} else {
								nav.removeAttribute('style');
								nav.classList.remove('nav-fixed-position');
							}
						}
						else if (secReserved !== null) {
							if (window.innerWidth >= 1024) {
								var footer = document.querySelector('.group--prefooter');
								const headerHeight = document.querySelector('.header').offsetHeight
								var footerOffset = footer.getBoundingClientRect();
								var topFooter = footerOffset.top;
								var materialsOffset = secReserved.getBoundingClientRect();
								var topMaterials = materialsOffset.top;

								if ((topMaterials - headerHeight) < 0 && (topFooter > 0)) {
									nav.classList.add('nav-fixed-position');
									nav.style.top = headerHeight + 'px';
								} else {
									nav.removeAttribute('style');
									nav.classList.remove('nav-fixed-position');
								}
							} else {
								nav.removeAttribute('style');
								nav.classList.remove('nav-fixed-position');
							}

						}
					}, false);
					

				}
			}),
		);
	}

}

LocomotiveScrollStickyDirective.meta = {
	selector: '[locomotive-scroll-sticky],[[locomotive-scroll-sticky]]',
	inputs: ['target', 'until', 'bottom'],
};
