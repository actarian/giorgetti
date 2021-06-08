import { Component, getContext } from 'rxcomp';
import { first, takeUntil, tap } from 'rxjs/operators';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalService } from '../../common/modal/modal.service';
import { environment } from '../../environment';
import { FilesService } from '../../shared/files/files.service';
import { UserService } from '../../shared/user/user.service';
import { ReservedAreaService } from './reserved-area.service';

export class ReservedAreaComponent extends Component {

	onInit() {
		this.user = undefined;
		this.items = [];
		this.tree = [];
		this.files = [];
		this.visibleFiles = [];
		this.item = null;
		this.load$().pipe(
			first(),
		).subscribe();
		UserService.me$().pipe(
			takeUntil(this.unsubscribe$),
		).subscribe(user => {
			console.log('ReservedAreaComponent.user', user);
			this.user = user;
			this.pushChanges();
			LocomotiveScrollService.update();
		});
	}

	load$() {
		return ReservedAreaService.all$().pipe(
			tap(items => {
				this.items = items;
				this.tree = this.getTree(items);
				this.pushChanges();
			}),
		);
	}

	getTree(items, parentId) {
		let tree = items.filter(x => x.parentId === parentId && x.type === 'folder').map(x => {
			const item = Object.assign({}, x);
			item.items = this.getTree(items, x.id);
			return item;
		});
		return tree;
	}

	onOpen(item) {
		if (item.active) {
			this.item = item;
			this.files = this.items.filter(x => x.type === 'file' && x.parentId === item.id);
			this.visibleFiles = this.files.slice(0, Math.min(8, this.files.length));
			this.pushChanges();
			LocomotiveScrollService.update();
		}
	}

	showMore(event) {
		this.visibleFiles = this.files.slice();
		this.pushChanges();
		LocomotiveScrollService.update();
	}

	onProjectRegistration(event) {
		ModalService.open$({ src: environment.template.modal.projectsRegistrationModal }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('ReservedAreaComponent.onProjectRegistration', event);
			/*
			if (event instanceof ModalResolveEvent) {
				// window.location.href = environment.slug.reservedArea;
			}
			*/
		});
	}

	onToggleFile(file) {
		(this.hasFile(file) ? FilesService.removeFile$(file) : FilesService.addFile$(file)).pipe(
			first(),
		).subscribe(_ => {
			this.pushChanges();
		});
	}

	hasFile(file) {
		return FilesService.hasFile(file);
	}

	scrollTo(selector, event) {
		if (event) {
			event.preventDefault();
		}
		const { node } = getContext(this);
		const target = node.querySelector(selector);
		LocomotiveScrollService.scrollTo(target, { offset: - 160 });
	}
}

ReservedAreaComponent.meta = {
	selector: '[reserved-area]',
};
