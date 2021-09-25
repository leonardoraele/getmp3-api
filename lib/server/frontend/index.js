const { FRONTEND_PATH } = require('config');
const path = require('path');
const fs = require('fs');

module.exports = !FRONTEND_PATH
	? async () => {}
	: async function(fastify)
	{
		fastify.get('/', (request, reply) => {
			reply.header('Content-Type', 'text/html');
			return reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'index.html')));
		});

		fastify.get('/main.js', (request, reply) => {
			reply.header('Content-Type', 'application/javascript');
			return reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'main.js')));
		});

		fastify.get('/assets/:filename', (request, reply) => {
			return reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'assets', request.params.filename)));
		});
	};
