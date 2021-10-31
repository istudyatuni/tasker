import proxy from 'http2-proxy'

const DEV_SERVER = {
	hostname: 'localhost',
	port: 4000,
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	alias: {
		src: './src',
	},
	mount: {
		public: '/',
		src: '/dist',
	},
	plugins: ['@snowpack/plugin-svelte'],
	routes: [
		{
			src: '/api/.*',
			dest: (req, res) => {
				return proxy.web(req, res, DEV_SERVER)
			},
		},
		/* Enable an SPA Fallback in development: */
		{ match: 'routes', src: '.*', dest: '/index.html' },
	],
	optimize: {
		// bundle: true,
		minify: true,
		sourcemap: false,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		open: 'none',
	},
	buildOptions: {
		htmlFragments: true,
		baseUrl: '/',
	},
}
