const youtubeRoutes = require('./youtube');

module.exports = async function routes(fastify)
{
	fastify.register(youtubeRoutes, { prefix: '/youtube' });
};
