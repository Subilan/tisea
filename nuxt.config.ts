// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Tisea - Anything Titanium.',
			link: [
				{
					rel: 'preconnect',
					href: 'https://google-fonts.mirrors.sjtug.sjtu.edu.cn'
				},
				{
					rel: 'stylesheet',
					href: 'https://google-fonts.mirrors.sjtug.sjtu.edu.cn/css2?family=Rubik:ital,wght@0,400;0,500;0,700;1,400&display=swap'
				}
			]
		},
		pageTransition: {
			name: 'default-fade',
			mode: 'out-in'
		}
	},
	css: ['@/assets/styles/main.less'],
	routeRules: {
		'/auth': { ssr: false }
	}
});
