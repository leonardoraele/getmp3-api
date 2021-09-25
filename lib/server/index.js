const fastify = require('fastify')({ logger: true });
const routes = require('./routes');
const frontend = require('./frontend');

fastify.register(routes, { prefix: process.env.API_PATH ?? undefined });
fastify.register(frontend);

module.exports = fastify;
