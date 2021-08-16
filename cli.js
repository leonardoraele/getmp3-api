const path = require('path');
const commands = require('require-all')(path.resolve(__dirname, 'lib/cli'));
const { Command } = require('commander');

const mp3youtube = new Command()
	.version('0.1.0');

Object.values(commands).forEach(command => mp3youtube.addCommand(command));

mp3youtube.parse(process.argv);
