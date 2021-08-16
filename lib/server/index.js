const fastify = require('fastify')({ logger: true });
const routes = require('./routes');

fastify.register(routes);

module.exports = fastify;
