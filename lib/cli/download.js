const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const { pipeline } = require('stream');
const ytdl = require('ytdl-core');

const YOUTUBE_URL = videoId => `https://www.youtube.com/watch?v=${videoId}`;

module.exports = new Command()
	.command('download <video-id>')
	.description('Downloads a video from YouTube.')
	.option('-o|--output <destination>', 'Write to a file. If omitted, will output to stdout.')
	.action(function (videoId) {
		const { output: destination } = this.opts();
		const outputStream = destination
			? fs.createWriteStream(buildOutputPath(destination))
			: process.stdout;
		pipeline(
			ytdl(YOUTUBE_URL(videoId)),
			outputStream,
			error => error && console.error(error),
		);
	});

function buildOutputPath(destination) {
	path.extname(destination) || (destination += '.mp4');
	return path.resolve('.', destination);
}
