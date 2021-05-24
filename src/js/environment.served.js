
export const environmentServed = {
	flags: {
		production: true,
	},
	api: '/api',
	workers: {
		image: '/Client/docs/js/workers/image.service.worker.js',
		prefetch: '/Client/docs/js/workers/prefetch.service.worker.js',
	},
	template: {
		modal: {
			myModal: '/template/modules/giorgetti/my-modal.cshtml',
		}
	},
	googleMaps: {
		apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60',
	}
};
