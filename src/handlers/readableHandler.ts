import { Duplex } from "stream";
import { controller } from "../controller";

export const readableHandler = (duplex: Duplex) => {
    let data = "";
    return async () => {
        try {
            let chunk;
            while (null !== (chunk = duplex.read())) {
                data += chunk;
            }
            const [command, ...pixels] = data.split(" ");
            const args = pixels.map((num) => Number(num));
            const result = await controller(command, args);
            console.log(result);

            duplex.write(result);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        } finally {
            data = "";
        }
    };
};
