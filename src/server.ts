import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server:Server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
    console.log('server running...');

    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'Hello from nodejs with typescript', port: req.url}));
    }
})

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}...`);
})