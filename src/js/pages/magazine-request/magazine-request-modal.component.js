import { Component, getContext } from 'rxcomp';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalOutletComponent } from '../../common/modal/modal-outlet.component';
import { ModalService } from '../../common/modal/modal.service';

export class MagazineRequestModalComponent extends Component {

	onInit() {
		super.onInit();
		const { parentInstance } = getContext(this);
		this.magazineId = null;
		if (parentInstance instanceof ModalOutletComponent) {
			const data = parentInstance.modal.data;
			this.magazineId = data.magazineId;
			// console.log('MagazineRequestModalComponent.onInit', data);
		}
		LocomotiveScrollService.stop();
	}

	onClose() {
		ModalService.reject();
	}

	onDestroy() {
		LocomotiveScrollService.start();
	}
}

MagazineRequestModalComponent.meta = {
	selector: '[magazine-request-modal]'
};
