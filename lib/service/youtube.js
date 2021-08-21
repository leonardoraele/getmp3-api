const { FFmpeg } = require('prism-media');
const ytdl = require('ytdl-core');
const debug = require('debug')('app/service/youtube');
// const cache = new (require('streaming-cache'));

const YOUTUBE_URL = videoId => `https://www.youtube.com/watch?v=${videoId}`;

const PRIVATE =
{
	GET_FROM_YOUTUBE: Symbol('#getFromYouTube'),
};

module.exports =
{
	get(videoId)
	{
		// debug({ method: 'get', videoId, inCache: cache.exists(videoId) })
		// return cache.get(videoId)
		// 	?? this[PRIVATE.GET_FROM_YOUTUBE](videoId);
		return this[PRIVATE.GET_FROM_YOUTUBE](videoId);
	},
	[PRIVATE.GET_FROM_YOUTUBE](videoId)
	{
		const url = YOUTUBE_URL(videoId);
		const ytStream = ytdl(url)
			.on('error', debug.extend('ytdl-error:' + videoId));
		const transcoderStream = new FFmpeg({ args: ['-f', 'mp3'] })
			.on('error', debug.extend('ffmpeg-error:' + videoId));
		// const cacheStream = cache.set(videoId)
		// 	.on('error', debug.extend('cache-error:' + videoId));

		ytStream.on('error', error => {
			debug('ytStream error:', error);
			// cache.cache.del(videoId);
			// cacheStream.destroy(error);
		});

		return ytStream.pipe(transcoderStream)
			// .pipe(cacheStream)
			;
	},
};
