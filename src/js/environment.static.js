
export const environmentStatic = {
	flags: {
		production: false,
		cart: true,
	},
	markets: ['IT', 'EU', 'AM', 'AS', 'IN'],
	defaultMarket: 'IT',
	currentMarket: 'IT',
	userCountry: 'IT',
	userMarket: 'IT',
	languages: ['it', 'en', 'de', 'ch'],
	defaultLanguage: 'it',
	currentLanguage: 'it',
	api: '/giorgetti/api',
	assets: '/giorgetti/',
	slug: {
		configureProduct: `/giorgetti/products-configure.html`,
		cart: `/giorgetti/cart.html`,
		reservedArea: `/giorgetti/reserved-area.html`,
	},
	template: {
		modal: {
			careersModal: '/giorgetti/partials/modals/careers-modal.html',
			genericModal: '/giorgetti/partials/modals/generic-modal.html',
			magazineRequestModal: '/giorgetti/partials/modals/magazine-request-modal.html',
			marketsAndLanguagesModal: '/giorgetti/partials/modals/markets-and-languages-modal.html',
			marketPropositionModal: '/giorgetti/partials/modals/market-proposition-modal.html',
			materialsModal: '/giorgetti/partials/modals/materials-modal.html',
			ordersModal: '/giorgetti/partials/modals/orders-modal.html',
			projectsRegistrationModal: '/giorgetti/partials/modals/projects-registration-modal.html',
			userModal: '/giorgetti/partials/modals/user-modal.html',
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
		image: './js/workers/image.service.worker.js',
		prefetch: './js/workers/prefetch.service.worker.js',
	},
	githubDocs: 'https://raw.githubusercontent.com/actarian/giorgetti/main/docs/',
};

// AIzaSyAIsa4g8z-HPPwohsf8jzVTbKw-DiI8k5w
