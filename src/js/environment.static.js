
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
		reservedArea: `/giorgetti/reserved-area.html`,
	},
	template: {
		modal: {
			userModal: '/giorgetti/user-modal.html',
			projectsRegistrationModal: '/giorgetti/projects-registration-modal.html',
			materialsModal: '/giorgetti/materials-modal.html',
		}
	},
	googleMaps: {
		apiKey: 'AIzaSyAIsa4g8z-HPPwohsf8jzVTbKw-DiI8k5w',
	}
};
