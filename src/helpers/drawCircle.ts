import robot from "robotjs";

export const drawCircle = (radius: number) => {
    const { x, y } = robot.getMousePos();
    robot.dragMouse(x + radius, y);
    robot.mouseToggle("down");
    for (let i = 0; i < Math.PI * 2; i += 0.01) {
        const posX = x + radius * Math.cos(i);
        const posY = y + radius * Math.sin(i);
        robot.dragMouse(posX, posY);
    }
    robot.mouseToggle("up");
};
