const YoutubeService = require('lib/service/youtube');

module.exports = async function routes(fastify)
{
	fastify.get('/:videoId', (request, reply) => {
		const { videoId } = request.params;

		reply.header('Content-Type', 'audio/mpeg');

		return YoutubeService.get(videoId);
	});
};
