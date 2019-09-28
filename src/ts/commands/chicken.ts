import * as Request from "request";

import { Message } from "../typings/Client/Message";
import * as fs from "fs";
import * as path from "path";
module.exports = {
    name: "chicken",
    aliases: [],
    usage: "chicken",
    description: "It's chicken",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        fs.readFile(path.join(__dirname, "../resources/chicken.jpg"), function (err, buffer) {
            if (err) return
            message.thread.broadcastPhoto({
                file: buffer,
                allowFullAspectRatio: true
            });
        });
    }
}