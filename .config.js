require('dotenv/config');

module.exports =
{
	SERVER_PORT: process.env.PORT ?? process.env.SERVER_PORT ?? 3100,
	SERVER_HOST: process.env.SERVER_HOST ?? '0.0.0.0',
	FRONTEND_PATH: process.env.FRONTEND_PATH,
	SERVER_API_PREFIX: process.env.SERVER_API_PREFIX ?? '/',
};
