import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
import { createClient } from "@prismicio/client";

export default defineNuxtConfig({
	ssr: false,

	app: {
		baseURL:"/pact",
		//baseURL:"/",
	},

	devtools: { enabled: false },
	css: ["~/assets/css/main.css"],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	modules: ["@nuxtjs/prismic", "nuxt-lenis"],

	prismic: {
	endpoint: apiEndpoint || repositoryName,
	clientConfig: {
		routes: [
			{
				type: 'chapter',
				path: '/chapter/:uid/'
			}
		]
	}
	},
	script:[
		{
			src: 'https://static.cdn.prismic.io/prismic.js?new=true&repo=un-sotf'
		}
	],
	hooks: {
	async 'nitro:config' (nitroConfig) {
	if (nitroConfig.dev) { return }
	let routes = [
		'/',
		'/chapter/a-more-sustainable-world/',
		'/chapter/a-more-peaceful-world/',
		'/chapter/a-more-digital-world/',
		'/chapter/a-more-forward-looking-world/',
		'/chapter/a-more-multilateral-world/',
		'/chapter/a-more-principled-world/',
	]
	const client = createClient('https://un-sotf.cdn.prismic.io/api/v2');
	// const result = await client.getSingle("navigation")
	// if(result){}
	// 	Object.entries(result.data.links).forEach(e=>{
	// 		const rute = e[1].link.url ? e[1].link.url : '/'
	// 		routes.push(rute)
	// 	})
	nitroConfig.prerender?.routes?.push(...routes)

	}
	},

	compatibilityDate: '2024-08-08',
});
