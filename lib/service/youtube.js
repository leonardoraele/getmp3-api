const { FFmpeg } = require('prism-media');
const ytdl = require('ytdl-core');
const cache = new (require('streaming-cache'));

const YOUTUBE_URL = videoId => `https://www.youtube.com/watch?v=${videoId}`;

const PRIVATE =
{
	GET_FROM_YOUTUBE: Symbol('#getFromYouTube'),
};

module.exports =
{
	get(videoId)
	{
		return cache.get(videoId)
			?? this[PRIVATE.GET_FROM_YOUTUBE](videoId);
	},
	[PRIVATE.GET_FROM_YOUTUBE](videoId)
	{
		const url = YOUTUBE_URL(videoId);
		const ytStream = ytdl(url);
		const transcoderStream = new FFmpeg({ args: ['-f', 'mp3'] });
		const cacheStream = cache.set(videoId);

		return ytStream.pipe(transcoderStream)
			.pipe(cacheStream);
	},
};
