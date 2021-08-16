const { FFmpeg } = require('prism-media');
const ytdl = require('ytdl-core');

const YOUTUBE_URL = videoId => `https://www.youtube.com/watch?v=${videoId}`;

module.exports = async function routes(fastify)
{
	fastify.get('/:videoId', (request, reply) => {
		const { videoId } = request.params;
		const url = YOUTUBE_URL(videoId);
		const ytStream = ytdl(url);
		const transcoder = new FFmpeg({ args: ['-f', 'mp3'] });

		reply.header('Content-Type', 'audio/mpeg');

		return ytStream.pipe(transcoder);
	});
};
