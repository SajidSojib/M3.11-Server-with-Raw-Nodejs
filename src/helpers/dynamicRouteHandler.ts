import { routes } from "./RouteHandler";

function findDinamicRoute(method: string, url: string) {
    const methodMap = routes.get(method);
    if(!methodMap) return undefined; //? return undefined if not found (method)
    
    for(const [path, handler] of methodMap) {
        const routeParts = path.split('/');
        const urlParts = url.split('/');
        if(routeParts.length !== urlParts.length) continue;
        let params:any = {};
        let match = true;
        for(let i = 0; i < routeParts.length; i++) {
            if(routeParts[i]?.startsWith(':')) {
                params[routeParts[i]?.substring(1)!] = urlParts[i];
            }else if(routeParts[i] !== urlParts[i]) {
                match = false;
                break;
            }
        }
        if(match) {
            return {handler, params};
        }
        return null;
    }
}

export default findDinamicRoute