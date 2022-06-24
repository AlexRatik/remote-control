import { httpServer } from "./http_server/index";
import { WebSocketServer, createWebSocketStream, AddressInfo } from "ws";
import "dotenv/config";
import { readableHandler } from "./handlers/readableHandler";
import { IWebSocket } from "./interfaces/IWebSocket";
import { interval } from "./utils/interval";
import { heartbeat } from "./utils/heartbeat";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
export const wss = new WebSocketServer({ port: +process.env.PORT || 8080 });

wss.on("connection", async function (ws: IWebSocket, req) {
    const ip = req.socket.remoteAddress;
    const { port } = wss.address() as AddressInfo;
    console.log(`Connection enabled! IP:${ip} PORT:${port}`);
    ws.isAlive = true;

    const duplex = createWebSocketStream(ws, {
        encoding: "utf-8",
        decodeStrings: false,
    });
    duplex.on("readable", readableHandler(duplex));
    ws.on("pong", heartbeat);
    ws.on("close", () => {
        duplex.destroy();
    });
});
wss.on("close", () => {
    clearInterval(interval);
});
process.on("SIGINT", () => {
    wss.close();
});
