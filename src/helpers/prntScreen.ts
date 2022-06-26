import Jimp from "jimp";
import robot from "robotjs";

export const prntScreen = async (): Promise<string> => {
    const size = 100;
    const { x, y } = robot.getMousePos();
    const bitmap = robot.screen.capture(x - size, y - size, 2 * size, 2 * size);
    const image = new Jimp(bitmap.width, bitmap.height);
    let pos = 0;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++);
    });
    const base64 = await image.getBase64Async(image.getMIME());
    const result = base64.split(",")[1];
    return result;
};
