import { Component, getContext } from 'rxcomp';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalOutletComponent } from '../../common/modal/modal-outlet.component';
import { ModalService } from '../../common/modal/modal.service';

export class ProductsDetailRequestModalComponent extends Component {

	onInit() {
		this.product = null;
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			const data = parentInstance.modal.data;
			this.product = data.product;
			console.log('ProductsDetailRequestModalComponent.onInit', data);
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

ProductsDetailRequestModalComponent.meta = {
	selector: '[products-detail-request-modal]'
};
