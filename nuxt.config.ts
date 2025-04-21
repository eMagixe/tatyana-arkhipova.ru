// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: {enabled: false},
	modules: [
		'@nuxt/ui',
		'@nuxtjs/strapi',
		'@nuxt/icon',
		'@nuxt/image',
	],
	css: ['@/assets/css/main.css'],
	ui: {
		fonts: false,
		colorMode: false
	},
	strapi: {
		url: 'https://api.tatyana-arkhipova.ru',
		version: 'v5',
		prefix: '/',
	},
	app: {
		head: {
			title: 'Татьяна Архипова - 3D Дизайнер',
			link: [{rel: 'icon', type: 'image/svg', href: '/favicon.svg'}]
		}
	}
})