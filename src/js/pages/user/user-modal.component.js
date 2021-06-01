import { getContext } from 'rxcomp';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';
import { ModalOutletComponent } from '../../core/modal/modal-outlet.component';
import { ModalService } from '../../core/modal/modal.service';
import { UserComponent } from './user.component';

export class UserModalComponent extends UserComponent {

	onInit() {
		super.onInit();
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			const data = parentInstance.modal.data;
			this.view = data.view;
			// console.log('UserModalComponent.onInit', data);
		}
		LocomotiveScrollService.stop();
	}

	onDestroy() {
		LocomotiveScrollService.start();
	}

	onSignIn(user) {
		// console.log('UserModalComponent.onSignIn', user);
		ModalService.resolve(user);
	}

	onSignUp(user) {
		// console.log('UserModalComponent.onSignUp', user);
		ModalService.resolve(user);
	}

	close() {
		ModalService.reject();
	}

}

UserModalComponent.meta = {
	selector: '[user-modal]'
};
