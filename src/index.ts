import Jimp from "jimp";
import { httpServer } from "./http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import "dotenv/config";
import { COMMANDS } from "./enums/commandsEnum";
import { drawCircle } from "./helpers/drawCircle";
import { drawSquare } from "./helpers/drawSquare";
import { drawRectangle } from "./helpers/drawRectangle";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
const wss = new WebSocketServer({ port: +process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    console.log("Connection enabled");

    ws.on("message", (message) => {
        const [command, ...pixels] = message.toString().split(" ");
        const { x, y } = robot.getMousePos();
        switch (command) {
            case COMMANDS.MOUSE_POSITION: {
                ws.send(`${command} ${x},${y}`);
                break;
            }
            case COMMANDS.MOUSE_UP: {
                robot.dragMouse(x, y - +pixels[0]);
                ws.send(command);
                break;
            }
            case COMMANDS.MOUSE_RIGHT: {
                robot.dragMouse(x + +pixels[0], y);
                ws.send(command);
                break;
            }
            case COMMANDS.MOUSE_DOWN: {
                robot.dragMouse(x, y + +pixels[0]);
                ws.send(command);
                break;
            }
            case COMMANDS.MOUSE_LEFT: {
                robot.dragMouse(x - +pixels[0], y);
                ws.send(command);
                break;
            }
            case COMMANDS.DRAW_CIRCLE: {
                drawCircle(+pixels[0]);
                ws.send(command);
                break;
            }
            case COMMANDS.DRAW_SQUARE: {
                drawSquare(+pixels[0]);
                ws.send(command);
                break;
            }
            case COMMANDS.DRAW_RECTANGLE: {
                console.log(message.toString());

                drawRectangle(+pixels[0], +pixels[1]);
                ws.send(command);
                break;
            }
        }
    });
});
