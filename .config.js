require('dotenv/config');

module.exports =
{
	SERVER_PORT: process.env.PORT ?? process.env.SERVER_PORT ?? 3100,
	SERVER_HOST: process.env.SERVER_HOST ?? '127.0.0.1',
};
