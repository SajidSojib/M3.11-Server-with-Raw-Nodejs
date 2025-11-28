import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helpers/RouteHandler";
import "./routes";


const server:Server = http.createServer((req:IncomingMessage, res:ServerResponse) => {
    console.log('server running...');

    const method = req.method?.toUpperCase() || '';
    const path = req.url || '';
    const methodMap = routes.get(method);
    const handler:RouteHandler | undefined = methodMap?.get(path);

    if(handler) {
        handler(req, res);
    }else {
        res.writeHead(404, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'Route not found', path: req.url}));
    }

    /*
    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'Hello from nodejs with typescript', path: req.url}));
    }

    if(req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify({message: 'health status ok', path: req.url}));
    }

    if(req.url === '/api/users' && req.method === 'POST') {
      // const user = {
      //   name: 'John Doe',
      //   age: 30,
      // }
      // res.writeHead(200, {'content-type': 'application/json'});
      // res.end(JSON.stringify(user));

      let body = "";                            //? must be sting
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {                     //? only call after all chunk loads
        try {
          //   res.end(body)                       //? sends body

          const perseBody = JSON.parse(body);
          // res.end(perseBody)                    //! error
          res.end(JSON.stringify(perseBody));

        } catch (err:any) {
          res.statusCode = 400;
          res.end(err?.message);
        }
      });

        // res.end(body)   //? empty
    }
    */    
})

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}...`);
})