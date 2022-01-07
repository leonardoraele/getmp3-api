const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const { pipeline } = require('stream');
const Throw = require('throw2');
const services = require('lib/service');

module.exports = new Command()
	.command('download <video-url>')
	.description('Downloads a video from YouTube or Spotify.')
	.option('-o|--output <destination>', 'Write to a file. If omitted, will output to stdout.')
	.action(async function (videoUrl) {
		// Prepare input stream
		const inputStream = await Object.values(services).find(service => service.checkValidUrl(videoUrl))
			?.get(videoUrl)
			?? Throw('Cannot download from this url.');

		// Prepare output stream
		const { output: outputFilename } = this.opts();
		const outputPath = outputFilename && path.resolve(process.cwd(), outputFilename);
		const outputStream = outputFilename
			? fs.createWriteStream(outputPath)
			: process.stdout;

		pipeline(
			inputStream,
			outputStream,
			error => error ? console.error(error)
				: outputPath ? console.info('File written to', outputPath)
				: undefined,
		);
	});
