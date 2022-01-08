const { default: scdl } = require('soundcloud-downloader');
const { URL } = require('url');
const debug = require('debug')('app/service/sound-cloud');

module.exports =
{
	buildUrl(userId, audioId)
	{
		return `https://soundcloud.com/${userId}/${audioId}`;
	},
	checkValidUrl(url)
	{
		return new URL(url).hostname.endsWith('soundcloud.com');
	},
	async get(url)
	{
		const stream = await scdl.download(url);
		stream.on('error', error => debug('scdl-error:', url, error));
		return stream;
	}
};
