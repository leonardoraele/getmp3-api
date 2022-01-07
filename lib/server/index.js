const fastify = require('fastify')({ logger: true });
const routes = require('./routes');
const frontend = require('./frontend');
const { SERVER_API_PREFIX: prefix } = require('config');

fastify.register(routes, { prefix });
fastify.register(frontend);

module.exports = fastify;
