
export const environmentServed = {
	flags: {
		production: true,
	},
	api: '/api',
	assets: '/Client/docs/',
	workers: {
		image: '/Client/docs/js/workers/image.service.worker.js',
		prefetch: '/Client/docs/js/workers/prefetch.service.worker.js',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
	slug: {
		configureProduct: `/Client/docs/products-configure.html`,
	},
	template: {
		modal: {
			userModal: '/template/shared/user-modal.cshtml',
		}
	},
	googleMaps: {
		apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60',
	}
};
