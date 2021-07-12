
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
			careersModal: '/template/modals/careers-modal.cshtml',
			projectsRegistrationModal: '/template/modals/projects-registration-modal.cshtml',
			materialsModal: '/template/modals/materials-modal.cshtml',
			marketsAndLanguagesModal: '/template/modals/markets-and-languages-modal.cshtml',
		}
	},
	facebook: {
		appId: 610048027052371,
		fields: 'id,name,first_name,last_name,email,gender,picture,cover,link',
		scope: 'public_profile, email', // publish_stream
		tokenClient: '951b013fe59b05cf471d869aae9ba6ba',
		version: 'v11.0',
	},
	google: {
		clientId: '760742757246-61qknlmthbmr54bh7ch19kjr0sftm4q3.apps.googleusercontent.com',
	},
	linkedIn: {
		clientId: '77cg5ls5lgu3k3',
		clientSecret: 'gfBIl365EdckxCgK',
		scope: 'r_emailaddress r_liteprofile',
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
