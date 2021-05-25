import { Component, getContext } from 'rxcomp';

let ID = 0;


export class ThronComponent extends Component {

	onInit() {
		// console.log('ThronComponent.onInit');
		const THRON = window.THRONContentExperience || window.THRONPlayer;
		if (!THRON) {
			return;
		}
		// console.log('THRONContentExperience', window.THRONContentExperience, 'THRONPlayer', window.THRONPlayer);
		const { node } = getContext(this);
		const target = this.target = node.querySelector('.video > .thron');
		const id = target.id = `thron-${++ID}`;
		let media = this.thron;
		if (media.indexOf('pkey=') === -1) {
			const splitted = media.split('/');
			const clientId = splitted[6];
			const xcontentId = splitted[7];
			const pkey = splitted[8];
			media = `https://gruppoconcorde-view.thron.com/api/xcontents/resources/delivery/getContentDetail?clientId=${clientId}&xcontentId=${xcontentId}&pkey=${pkey}`;
		}
		const controls = this.controls = node.hasAttribute('controls') ? true : false,
			loop = this.loop = node.hasAttribute('loop') ? true : false,
			autoplay = this.autoplay = node.hasAttribute('autoplay') ? true : false;
		const player = this.player = THRON(id, {
			media: media,
			loop: loop,
			autoplay: autoplay,
			muted: !controls,
			displayLinked: 'close',
			noSkin: !controls,
			// lockBitrate: 'max',
		});
		this.onReady = this.onReady.bind(this);
		this.onCanPlay = this.onCanPlay.bind(this);
		this.onPlaying = this.onPlaying.bind(this);
		this.onComplete = this.onComplete.bind(this);
		player.on('ready', this.onReady);
		player.on('canPlay', this.onCanPlay);
		player.on('playing', this.onPlaying);
		player.on('complete', this.onComplete);
	}

	onReady() {
		const { node } = getContext(this);
		const id = this.target.id;
		const player = this.player;
		if (!this.controls) {
			const mediaContainer = player.mediaContainer();
			const video = mediaContainer.querySelector('video');
			video.setAttribute('playsinline', 'true');
			video.setAttribute('autoplay', 'true');
		}
		this.ready.next(id);
		// video.setAttribute('autoplay', 'true');
	};

	onCanPlay() {
		const { node } = getContext(this);
		const id = this.target.id;
		// console.log('ThronDirective.onCanPlay', id);
		this.canPlay.next(id);
	}

	onPlaying() {
		const { node } = getContext(this);
		const id = this.target.id;
		const player = this.player;
		player.off('playing', this.onPlaying);
		if (!this.controls) {
			const qualities = player.qualityLevels();
			// console.log('ThronDirective.onPlaying', id, qualities);
			if (qualities.length) {
				const highestQuality = qualities[qualities.length - 1].index;
				const lowestQuality = qualities[0].index;
				player.currentQuality(highestQuality);
				// console.log('ThronDirective.onPlaying', id, 'currentQuality', player.currentQuality());
			}
		}
	}

	onComplete() {
		const { node } = getContext(this);
		const id = this.target.id;
		// console.log('ThronDirective.onComplete', id);
		this.complete.next(id);
	}

	playVideo() {
		const { node } = getContext(this);
		const id = this.target.id;
		const player = this.player;
		const status = player.status();
		// console.log('ThronDirective.playVideo', id, status);
		if (status && !status.playing) {
			player.play();
		}
	}

	pauseVideo() {
		const { node } = getContext(this);
		const id = this.target.id;
		const player = this.player;
		const status = player.status();
		// console.log('ThronDirective.pauseVideo', id, status);
		if (status && status.playing) {
			player.pause();
		}
	}

	toggle() {
		const { node } = getContext(this);
		const id = this.target.id;
		const player = this.player;
		const status = player.status();
		// console.log('ThronDirective.pauseVideo', id, status);
		if (status && status.playing) {
			player.pause();
		} else {
			player.play();
		}
	}

	play(id) {
		// console.log('ThronDirective.play', id, id, id === id);
		const { node } = getContext(this);
		if (id === this.target.id) {
			this.playVideo();
		}
	}

	pause(id) {
		// console.log('ThronDirective.pause', id, id, id === id);
		const { node } = getContext(this);
		if (id === this.target.id) {
			this.pauseVideo();
		}
	}

	onDestroy() {
		const player = this.player;
		if (player) {
			player.off('ready', this.onReady);
			player.off('canPlay', this.onCanPlay);
			player.off('playing', this.onPlaying);
			player.off('complete', this.onComplete);
		}
	}
}

ThronComponent.meta = {
	selector: '[thron],[[thron]]',
	outputs: ['ready', 'canPlay', 'complete'],
	inputs: ['thron', 'm3u8'],
	template: /* html */``,
};
