import { COMMANDS } from "./enums/commandsEnum";
import robot from "robotjs";
import { drawCircle } from "./helpers/drawCircle";
import { drawSquare } from "./helpers/drawSquare";
import { drawRectangle } from "./helpers/drawRectangle";
import { prntScreen } from "./helpers/prntScreen";

export const controller = async (command: string, pixels: number[]) => {
    const { x, y } = robot.getMousePos();
    let result = "";
    switch (command) {
        case COMMANDS.MOUSE_POSITION: {
            result = `${command} ${x},${y}`;
            break;
        }
        case COMMANDS.MOUSE_UP: {
            robot.dragMouse(x, y - +pixels[0]);
            result = command;
            break;
        }
        case COMMANDS.MOUSE_RIGHT: {
            robot.dragMouse(x + +pixels[0], y);
            result = command;
            break;
        }
        case COMMANDS.MOUSE_DOWN: {
            robot.dragMouse(x, y + +pixels[0]);
            result = command;
            break;
        }
        case COMMANDS.MOUSE_LEFT: {
            robot.dragMouse(x - +pixels[0], y);
            result = command;
            break;
        }
        case COMMANDS.DRAW_CIRCLE: {
            drawCircle(+pixels[0]);
            result = command;
            break;
        }
        case COMMANDS.DRAW_SQUARE: {
            drawSquare(+pixels[0]);
            result = command;
            break;
        }
        case COMMANDS.DRAW_RECTANGLE: {
            drawRectangle(+pixels[0], +pixels[1]);
            result = command;
            break;
        }
        case COMMANDS.PRNT_SCRN: {
            const png = await prntScreen();
            result = `${command} ${png}`;
            break;
        }
        default: {
            throw new Error(`No command with such name: "${command}"`);
        }
    }
    result += "\0";
    return result;
};
