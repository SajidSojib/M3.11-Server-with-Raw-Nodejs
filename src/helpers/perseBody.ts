import { IncomingMessage } from "http";

async function perseBody(req:IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
        req.on("error", (err) => {
            reject(err);
        });
    });
}

export default perseBody;