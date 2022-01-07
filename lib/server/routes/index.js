const youtubeRoutes = require('./youtube');
const services = Object.values(require('lib/service'));

module.exports = async function routes(fastify)
{
	fastify.register(youtubeRoutes, { prefix: '/youtube' });

	fastify.get('/download', (request, reply) =>
	{
		const { url } = request.query;
		const service = services.find(service => service.checkValidUrl(url));
		reply.header('Content-Type', 'audio/mpeg');
		return service.get(url);
	});
};
