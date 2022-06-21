import robot from "robotjs";

export const drawSquare = (a: number) => {
    let { x, y } = robot.getMousePos();
    const { x: initX, y: initY } = { x, y };
    robot.mouseToggle("down");
    for (let i = 0; i < a * 4; i += 1) {
        if (x < initX + a && y === initY) x += 1;
        else if (y < initY + a && x !== initX) y += 1;
        else if (x > initX && y !== initY) x -= 1;
        else if (y > initY && x === initX) y -= 1;
        robot.dragMouse(x, y);
    }
    robot.mouseToggle("up");
};
