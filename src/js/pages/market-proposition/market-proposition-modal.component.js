import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { LocomotiveScrollService } from '../../common/locomotive-scroll/locomotive-scroll.service';
import { ModalOutletComponent } from '../../common/modal/modal-outlet.component';
import { ModalService } from '../../common/modal/modal.service';
import { environment } from '../../environment';
import { MarketsAndLanguagesService } from '../markets-and-languages/markets-and-languages.service';
import {LocalStorageService} from "../../common/storage/local-storage.service";

export class MarketPropositionModalComponent extends Component {

	onInit() {
		super.onInit();
		const { parentInstance } = getContext(this);
		if (parentInstance instanceof ModalOutletComponent) {
			const data = parentInstance.modal.data;
		}
		LocomotiveScrollService.stop();
		this.currentMarket = environment.currentMarket;
		this.currentLanguage = environment.currentLanguage;
		this.markets = [];
		this.proposedMarket = null;
		MarketsAndLanguagesService.all$(environment.currentCoId).pipe(
			first(),
		).subscribe(markets => {
			this.markets = markets;
			let proposedMarket = markets.find(x => x.code === environment.userMarket);
			if (!proposedMarket) {
				proposedMarket = markets.find(x => x.code === 'ww') || markets[0];
			}
			this.proposedMarket = proposedMarket;
			let proposedLanguage = proposedMarket.languages.find(x => x.code === environment.currentLanguage);
			if (!proposedLanguage) {
				proposedLanguage = proposedMarket.languages[0];
			}
			this.proposedLanguage = proposedLanguage;
			this.pushChanges();
		});
	}

	setMarket(market) {
		this.currentMarket = market.code;
		this.pushChanges();
	}

	onClose() {
		document.cookie = "marketPropositionAccepted=1; expires=0; path=/";
		ModalService.reject();
	}

	onDestroy() {
		LocomotiveScrollService.start();
	}
}

MarketPropositionModalComponent.meta = {
	selector: '[market-proposition-modal]'
};
