import { Component } from 'rxcomp';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../../common/modal/modal.service';
import { environment } from '../../environment';

export class MagazineRequestPropositionComponent extends Component {

	onOpen() {
		ModalService.open$({ src: environment.template.modal.magazineRequestModal, data: { magazineId: this.magazineId } }).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(event => {
			console.log('MagazineRequestPropositionComponent.onOpen', event);
		});
	}

}

MagazineRequestPropositionComponent.meta = {
	selector: '[magazine-request-proposition]',
	inputs: ['magazineId'],
};
