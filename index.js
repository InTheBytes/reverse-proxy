const http = require('http'),
	httpProxy = require('http-proxy')

const config = require('./config.json')

// Creating the proxy server
const proxy = httpProxy.createProxyServer({})

// Error handling
proxy.on('error', function(e) {
	console.log("Proxy error, check requested port is listening")
	console.dir(e)
})

// Inject CORS fix into header
proxy.on('proxyRes', function(proxyRes, req, res, options) {
	if (proxyRes.headers['Access-Control-Allow-Origin']) {
		proxyRes.headers['Access-Control-Allow-Origin'] += ', '+ config.localUrl +':'+ config.localPort
	} else {
		proxyRes.headers['Access-Control-Allow-Origin'] = config.localUrl +':'+ config.localPort
	}
});

// Creating HTTP server and routing traffic through the proxy server
const server = http.createServer(function (req, res) {

	// rewriting the origin to fool CORS on microservices
	let newReq = req;
	newReq.headers.origin = config.baseUrl

	if (req.headers['access-control-request-method']) {
		res.setHeader('access-control-allow-methods', newReq.headers['access-control-request-method'])
	}
	if (req.headers['access-control-request-headers']) {
		res.setHeader('access-control-allow-headers', newReq.headers['access-control-request-headers'])
	}
	if (req.headers.origin) {
		res.setHeader('access-control-allow-origin', newReq.headers.origin)
		res.setHeader('access-control-allow-credentials', 'true')
	}

	// Check pattern and route accordingly
	for (const route of config.routeTable) {
		for (const pattern of route.patterns) {
			if (req.url.match(pattern)) {
				console.log(pattern)
				return proxy.web(req, res, {target: config.localUrl +':'+ route.port});
			}
		}
	}
});

// Creating the listener for the server
console.log("listening on port "+ config.port)
server.listen(config.port);