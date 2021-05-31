
export const environmentStatic = {
	flags: {
		production: false,
	},
	api: '/giorgetti/api',
	assets: '/giorgetti/',
	workers: {
		image: './js/workers/image.service.worker.js',
		prefetch: './js/workers/prefetch.service.worker.js',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
	slug: {
		configureProduct: `/giorgetti/products-configure.html`,
	},
	template: {
		modal: {
			myModal: '/my-modal.html',
		}
	},
	googleMaps: {
		apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60',
	}
};
