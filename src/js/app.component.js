import { Component, getContext } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { ModalResolveEvent, ModalService } from './core/modal/modal.service';
import { environment } from './environment';
import { UserService } from './pages/user/user.service';

export class AppComponent extends Component {

	onInit() {
		const { node } = getContext(this);
		node.classList.remove('hidden');
		console.log('AppComponent.onInit');
	}

	onLogin() {
		ModalService.open$({ src: environment.template.modal.userModal, data: { view: 1 } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('AppComponent.onLogin', event);
			if (event instanceof ModalResolveEvent) {
				UserService.setUser(event.data);
			}
		});
	}
}

AppComponent.meta = {
	selector: '[app-component]',
};
