import { wss } from "..";
import { IWebSocket } from "../interfaces/IWebSocket";

export const interval = setInterval(() => {
    wss.clients.forEach((ws: IWebSocket) => {
        if (!ws.isAlive) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
    });
}, 30000);
