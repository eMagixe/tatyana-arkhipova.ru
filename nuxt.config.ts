// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: {enabled: false},
	modules: ['@nuxt/ui', '@nuxtjs/strapi', '@nuxt/icon'],
	css: ['@/assets/css/main.css'],
	ui: {
		fonts: false,
		colorMode: false
	},
	strapi: {
		url: 'http://tatyana-arkhipova.ru:1337',
		version: 'v5',
		prefix: '/',
	},
})