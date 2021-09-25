const { FRONTEND_PATH } = require('config');
const path = require('path');
const fs = require('fs');
const trimStart = require('lodash/trimStart');

module.exports = !FRONTEND_PATH
	? async () => {}
	: async function(fastify)
	{
		fastify.get('/', async (request, reply) =>
		{
			reply.type('text/html');
			reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'index.html')));
		});

		fastify.setNotFoundHandler(async (request, reply) =>
		{
			const filepath = path.resolve(FRONTEND_PATH, trimStart(request.raw.url, '/'));
			const exists = await fs.promises.stat(filepath)
				.then(() => true)
				.catch(() => false);

			if (exists)
			{
				reply.send(fs.createReadStream(filepath));
			}
			else
			{
				reply.statusCode = 404;
				return JSON.stringify(
				{
					error:
					{
						message: 'Resource not found.',
						status: reply.statusCode,
						path: request.raw.url,
					},
				});
			}
		});

		// fastify.get('/main.js', (request, reply) => {
		// 	reply.header('Content-Type', 'application/javascript');
		// 	return reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'main.js')));
		// });

		// fastify.get('/assets/:filename', (request, reply) => {
		// 	return reply.send(fs.createReadStream(path.resolve(FRONTEND_PATH, 'assets', request.params.filename)));
		// });
	};
