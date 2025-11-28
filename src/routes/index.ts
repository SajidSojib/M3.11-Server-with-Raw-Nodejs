import { readUsers, writeUsers } from "../helpers/fileDb";
import perseBody from "../helpers/perseBody";
import addRoute from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";

addRoute('GET', '/', (req, res) => {
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Hello from nodejs with typescript",
    //     path: req.url,
    //   })
    // );
    sendJson(res, 200, {
        message: "Hello from nodejs with typescript",
        path: req.url,
    });
})

addRoute('GET', '/api', (req, res) => {
    sendJson(res, 200, {
        message: "health status ok",
        path: req.url,
    });
})

addRoute('POST', '/api/users', async (req, res) => {
    const body = await perseBody(req);

    const users = readUsers();
    const newUser = {
        id: new Date().toLocaleString(),
        ...body,
    }
    users.push(newUser);
    writeUsers(users);

    sendJson(res, 201, {
        message: "User created",
        path: req.url,
        data: newUser
    });
})