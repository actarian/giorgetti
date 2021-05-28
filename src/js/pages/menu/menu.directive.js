import { Directive, getContext } from 'rxcomp';

const MENUS = [];

export class MenuDirective extends Directive {

	onInit() {
		const { node } = getContext(this);
		const target = this.target = document.querySelector(`#menu-${this.menu}`);
		const container = this.container = target.querySelector(`.container`);
		this.onOver = this.onOver.bind(this);
		this.onLeave = this.onLeave.bind(this);
		node.addEventListener('mouseover', this.onOver);
		MENUS.push(this);
	}

	onOver() {
		MENUS.forEach(x => x.onLeave());
		const target = this.target;
		target.classList.add('active');
		const container = this.container;
		container.addEventListener('mouseleave', this.onLeave);
	}

	onLeave() {
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
