const youtubeRoutes = require('./youtube');
const soundcloudRoutes = require('./soundcloud');
const services = Object.values(require('lib/service'));

module.exports = async function routes(fastify)
{
	fastify.register(youtubeRoutes, { prefix: '/youtube' });
	fastify.register(soundcloudRoutes, { prefix: '/soundcloud' });

	fastify.get('/download', (request, reply) =>
	{
		const { url } = request.query;
		const decodedUrl = decodeURI(url);
		const service = services.find(service => service.checkValidUrl(decodedUrl));
		reply.header('Content-Type', 'audio/mpeg');
		return service.get(url);
	});
};
