const SoundCloudService = require('lib/service/soundcloud');

module.exports = async function(fastify)
{
	fastify.get('/:userId/:audioId', (request, reply) => {
		const { userId, audioId } = request.params;
		const url = SoundCloudService.buildUrl(userId, audioId);

		reply.header('Content-Type', 'audio/mpeg');

		return SoundCloudService.get(url);
	});
};
