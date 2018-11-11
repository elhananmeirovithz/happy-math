// this file handle the server listiner

const http = require('http');
const app = require('./app');// to the file that we just set up

const port = process.env.PORT  || 3000;

const server = http.createServer(app); //we need to enter a liciner that will actiate each time we enter a new request and activate app which is requare app js file

server.listen(port);