
export const environmentStatic = {
	flags: {
		production: false,
	},
	markets: ['IT', 'EU', 'AM', 'AS', 'IN'],
	defaultMarket: 'IT',
	currentMarket: 'IT',
	languages: ['it', 'en', 'de', 'ch'],
	defaultLanguage: 'it',
	currentLanguage: 'it',
	api: '/giorgetti/api',
	assets: '/giorgetti/',
	slug: {
		configureProduct: `/giorgetti/products-configure.html`,
		reservedArea: `/giorgetti/reserved-area.html`,
	},
	template: {
		modal: {
			userModal: '/giorgetti/user-modal.html',
			careersModal: '/giorgetti/careers-modal.html',
			projectsRegistrationModal: '/giorgetti/projects-registration-modal.html',
			materialsModal: '/giorgetti/materials-modal.html',
			marketsAndLanguagesModal: '/giorgetti/markets-and-languages-modal.html',
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
		apiKey: 'AIzaSyAIsa4g8z-HPPwohsf8jzVTbKw-DiI8k5w',
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
