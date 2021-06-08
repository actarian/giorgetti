import { Directive, getContext } from 'rxcomp';

const MENUS = [];

export class MenuDirective extends Directive {

	onInit() {
		const { node } = getContext(this);
		const submenus = this.submenus = document.querySelector(`.group--submenus`);
		const target = this.target = document.querySelector(`#menu-${this.menu}`);
		const preview = target.querySelector('[data-target]');
		const previewSrc = this.previewSrc = preview.src;
		const container = this.container = target.querySelector(`.container`);
		this.onOver = this.onOver.bind(this);
		this.onLeave = this.onLeave.bind(this);
		node.addEventListener('click', this.onOver);
		MENUS.push(this);
	}

	onOver(event) {
		event.preventDefault();
		MENUS.forEach(x => x.onLeave(true));
		const submenus = this.submenus;
		submenus.classList.add('active');
		const target = this.target;
		const preview = target.querySelector('[data-target]');
		preview.src = this.previewSrc;
		target.classList.add('active');
		const container = this.container;
		container.addEventListener('mouseleave', this.onLeave);
	}

	onLeave(keepBackground) {
		if (keepBackground !== true) {
			const submenus = this.submenus;
			submenus.classList.remove('active');
		}
		const target = this.target;
		target.classList.remove('active');
		const container = this.container;
		container.removeEventListener('mouseleave', this.onLeave);
	}

	onDestroy() {
		this.onLeave();
		const { node } = getContext(this);
		node.removeEventListener('mouseover', this.onOver);
	}
}

MenuDirective.meta = {
	selector: '[menu]',
	inputs: ['menu'],
};
