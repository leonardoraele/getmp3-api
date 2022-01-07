const { default: spdl } = require('spdl-core');
const { URL } = require('url');
const debug = require('debug')('app/service/spotify');

module.exports =
{
	checkValidUrl(url)
	{
		return new URL(url).hostname.endsWith('spotify.com');
	},
	async get(url)
	{
		const stream = await spdl(url);
		stream.on('error', error => debug('spdl-error:', videoUrl, error));
		return stream;
	}
};
