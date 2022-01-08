const YoutubeService = require('lib/service/youtube');

module.exports = async function(fastify)
{
	fastify.get('/:videoId', (request, reply) => {
		const { videoId } = request.params;
		const videoUrl = YoutubeService.buildUrl(videoId);

		reply.header('Content-Type', 'audio/mpeg');

		return YoutubeService.get(videoUrl);
	});
};
