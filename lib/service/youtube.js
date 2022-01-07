const { FFmpeg } = require('prism-media');
const ytdl = require('ytdl-core');
const debug = require('debug')('app/service/youtube');
// const cache = new (require('streaming-cache'));
const { URL } = require('url');

const PRIVATE =
{
	GET_FROM_YOUTUBE: Symbol('#getFromYouTube'),
};

module.exports =
{
	checkValidUrl(url)
	{
		return new URL(url).hostname.endsWith('youtube.com');
	},
	get(videoUrl)
	{
		// debug({ method: 'get', videoId, inCache: cache.exists(videoId) })
		// return cache.get(videoId)
		// 	?? this[PRIVATE.GET_FROM_YOUTUBE](videoId);
		return this[PRIVATE.GET_FROM_YOUTUBE](videoUrl);
	},
	[PRIVATE.GET_FROM_YOUTUBE](videoUrl)
	{
		const ytStream = ytdl(videoUrl)
			.on('error', error => debug('ytdl-error:', videoUrl, error));
		const transcoderStream = new FFmpeg({ args: ['-f', 'mp3'] })
			.on('error', error => debug('ffmpeg-error:', videoUrl, error));
		// const cacheStream = cache.set(videoId)
		// 	.on('error', debug.extend('cache-error:' + videoId));

		// ytStream.on('error', error => {
		// 	debug('ytStream error:', error);
		// 	// cache.cache.del(videoId);
		// 	// cacheStream.destroy(error);
		// });

		return ytStream.pipe(transcoderStream)
			// .pipe(cacheStream)
			;
	},
};
