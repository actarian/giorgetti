import { Component, getContext } from 'rxcomp';
import { first } from 'rxjs/operators';
import { HttpService } from '../../core/http/http.service';
import { LocomotiveScrollService } from '../../core/locomotive-scroll/locomotive-scroll.service';

const breadcumbStyle = `font-size: .8rem; text-transform: uppercase; letter-spacing: 0.075em; color: #37393b;`;
const titleStyle = `letter-spacing: 0; font-family: 'Bauer Bodoni', sans-serif; font-size: 2.9rem; margin: 0;word-wrap: break-word;text-transform: uppercase;color:#37393b;`;
const designerStyle = `font-size: .8rem; letter-spacing: 0.075em;margin-bottom: 15px;word-wrap: break-word;text-transform: uppercase;`;
const descriptionStyle = `font-size: .8rem; text-align: left;margin-bottom: 15px; letter-spacing: 0.05em;`;

const key = 'a9$hhVGHxos';

export class ProductsConfigureComponent extends Component {

	onInit() {
		this.isReady = false;
		this.isComplete = false;
		this.isConfiguring = false;
		const { node } = getContext(this);
		const iframe = this.iframe = node.querySelector('#showefy');
		if (!iframe) {
			throw ('missing iframe');
		}
		this.onEvent = this.onEvent.bind(this);

		HttpService.http$('POST', 'https://www.showefy.com/en/ApiExt/token/v1', { grant_type: 'client_credentials' }, 'json', 'giorgetti:AGdW%Q_8@Pe,2&#').pipe(
			first(),
		).subscribe(response => {
			console.log(response);
		});

		const sfy = this.sfy = new SFYFrame(iframe, key, this.onEvent);
		sfy.init();
		console.log('ProductsConfigureComponent.onInit', sfy, iframe);
	}

	getIframeDocument(iframe) {
		const content = iframe.contentWindow || iframe.contentDocument
		const iframeDocument = content.document ? content.document : content;
		return iframeDocument;
	}

	onEvent(data) {
		const event = JSON.parse(data);
		const eventName = event.emit;
		if (event.status == 0) {
			// console.log('ProductsConfigureComponent.onEvent', event);
			switch (eventName) {
				case 'showefy_ready':
					this.onReady(event);
					break;
				case 'showefy_complete':
					this.onShowefyComplete(event);
					break;
				case 'start_configurator':
					this.onStartConfigurator(event);
					break;
				case 'button_pressed':
					this.onButtonPressed(event);
					break;
				case 'setButtonStatus':
					this.onSetButtonStatus(event);
					break;
				case 'getIframeSize':
					this.onGetIframeSize(event);
					break;
				case 'getProductExtData':
					this.onGetProductExtData(event);
					break;
				case 'getFastProductExtData':
					this.onGetFastProductExtData(event);
					break;
			}
			if (this.isConfiguring && this.isReady && this.isComplete) {
				console.log('set taratura impaginazione configuratore');
				const { node } = getContext(this);
				// window.scroll(0, findPos(document.getElementById('container_ifrshowefy')));
				LocomotiveScrollService.update();
				LocomotiveScrollService.scrollTo(node, { offset: -100 });
			}
		} else {
			console.log('ProductsConfigureComponent.onEvent.error', event.status, event.statusTxt, eventName);
		}
	}

	onReady(event) {
		console.log('ProductsConfigureComponent.onReady', event);
		this.isReady = true;
		this.addTexts();
		this.addButtons();
		this.addBreadcrumb();
		return;
		const iframeDocument = this.getIframeDocument(this.iframe);
		console.log(iframeDocument.querySelector('head'));
		const style = iframeDocument.createElement('style');
		style.innerHTML = `
			* {
				background: none!important;
			}
		`;
		const head = iframeDocument.querySelector('head');
		head.appendChild(style);
	}

	onShowefyComplete(event) {
		console.log('ProductsConfigureComponent.onShowefyComplete', event);
		if (this.isConfiguring) {
			this.isComplete = true;
		}
	}

	onStartConfigurator(event) {
		console.log('ProductsConfigureComponent.onStartConfigurator', event);
		this.isConfiguring = true;
	}

	onButtonPressed(event) {
		console.log('ProductsConfigureComponent.onButtonPressed', event, 'buttonId', event.data.id);
	}

	onSetButtonStatus(event) {
		console.log('ProductsConfigureComponent.onSetButtonStatus', event);
	}

	onGetIframeSize(event) {
		console.log('ProductsConfigureComponent.onGetIframeSize', event);
	}

	onGetProductExtData(event) {
		console.log('ProductsConfigureComponent.onGetProductExtData', event);
	}

	onGetFastProductExtData(event) {
		console.log('ProductsConfigureComponent.onGetFastProductExtData', event);
	}

	findPos(obj) {
		let curtop = 0;
		if (obj.offsetParent) {
			do {
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
			return [curtop];
		}
	}

	// methods

	addTexts() {
		const sfy = this.sfy;
		const html = sfy.HTML;
		let index = 0;
		html.text[index++] = /* html */`<h1 style="${titleStyle}">Nome Prodotto</h1>`;
		html.text[index++] = /* html */`<h5 style="${designerStyle}">Designer</h5>`;
		html.text[index++] = /* html */`<div style="${descriptionStyle}"><p>Descrizione</p></div>`;
		sfy.printHTML(html);
	}

	addButtons() {
		const sfy = this.sfy;
		const buttons = sfy.BUTTONS;

		let index = 0;
		buttons.element[index] = new sfy.PROPERTIES();
		buttons.element[index].visibility = true;
		buttons.element[index].id = 'order';
		buttons.element[index].label = new sfy.LABEL();
		buttons.element[index].label.en = 'ADD TO CART';
		index++;

		buttons.element[index] = new sfy.PROPERTIES();
		buttons.element[index].visibility = true;
		buttons.element[index].id = 'save_configuration';
		buttons.element[index].label = new sfy.LABEL();
		buttons.element[index].label.en = 'SAVE CONFIGURATION';
		index++;

		sfy.setButtonStatus(buttons);
	}

	addBreadcrumb() {
		const sfy = this.sfy;
		const breadcrumb = sfy.BREADCUMB;

		let index = 0;

		breadcrumb.element[index] = new sfy.PROPERTIES();
		breadcrumb.element[index].visibility = true;
		breadcrumb.element[index].id = 'breadcumb_home';
		breadcrumb.element[index].label = new sfy.LABEL();
		breadcrumb.element[index].label.en = /* html */` Home <span aria-hidden='true'>/</span>&nbsp; `;
		breadcrumb.element[index].style = breadcumbStyle;
		index++;

		breadcrumb.element[index] = new sfy.PROPERTIES();
		breadcrumb.element[index].visibility = true;
		breadcrumb.element[index].id = 'breadcumb_products';
		breadcrumb.element[index].label = new sfy.LABEL();
		breadcrumb.element[index].label.en = /* html */` Products <span aria-hidden='true'>/</span>&nbsp; `;
		breadcrumb.element[index].style = breadcumbStyle;
		index++;

		breadcrumb.element[index] = new sfy.PROPERTIES();
		breadcrumb.element[index].visibility = true;
		breadcrumb.element[index].id = 'breadcumb_products';
		breadcrumb.element[index].label = new sfy.LABEL();
		breadcrumb.element[index].label.en = /* html */` Nome prodotto`;
		breadcrumb.element[index].style = breadcumbStyle;
		index++;

		sfy.printBreadcumb(breadcrumb);
	}

	getCartData() {
		const sfy = this.sfy;
		if (sfy) {
			sfy.getProductExtData();
		}
	}

	getFastData() {
		const sfy = this.sfy;
		if (sfy) {
			sfy.getFastProductExtData();
		}
	}
}

ProductsConfigureComponent.meta = {
	selector: '[products-configure]',
};
