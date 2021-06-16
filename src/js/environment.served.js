
export const environmentServed = {
	flags: {
		production: true,
	},
	markets: ['IT', 'EU', 'AM', 'AS', 'IN'],
	defaultMarket: 'IT',
	currentMarket: 'IT',
	languages: ['it', 'en', 'de', 'ch'],
	defaultLanguage: 'it',
	currentLanguage: 'it',
	api: '/api',
	assets: '/Client/docs/',
	slug: {
		configureProduct: `/it/it/products-configure`,
		reservedArea: `/it/it/reserved-area`,
	},
	template: {
		modal: {
			userModal: '/template/modals/user-modal.cshtml',
			projectsRegistrationModal: '/template/modals/projects-registration-modal.cshtml',
			materialsModal: '/template/modals/materials-modal.cshtml',
			marketsAndLanguagesModal: '/template/modals/markets-and-languages-modal.cshtml',
		}
	},
	googleMaps: {
		apiKey: 'AIzaSyDvGw6iAoKdRv8mmaC9GeT-LWLPQtA8p60',
	},
	thron: {
		clientId: '',
	},
	workers: {
		image: '/Client/docs/js/workers/image.service.worker.js',
		prefetch: '/Client/docs/js/workers/prefetch.service.worker.js',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
};
