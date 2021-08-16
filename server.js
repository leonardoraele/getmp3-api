const { SERVER_PORT, SERVER_HOST } = require('config');
const server = require('lib/server');

server.listen(SERVER_PORT, SERVER_HOST);
