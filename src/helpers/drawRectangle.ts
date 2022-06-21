import robot from "robotjs";

export const drawRectangle = (a: number, b: number) => {
    const width = a;
    const height = b * 2.5;
    let { x, y } = robot.getMousePos();

    const { x: initX, y: initY } = { x, y };
    robot.mouseToggle("down");
    for (let i = 0; i < (width + height) * 2; i += 1) {
        if (x < initX + width && y === initY) x += 1;
        else if (y < initY + height && x !== initX) y += 1;
        else if (x > initX && y !== initY) x -= 1;
        else if (y > initY && x === initX) y -= 1;
        robot.dragMouse(x, y);
    }
    robot.mouseToggle("up");
};
