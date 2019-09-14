import * as Request from "request";
import { Message } from "../typings/Client/Message";

module.exports = {
    name: "joke",
    aliases: ["dad-joke"],
    usage: "joke",
    description: "Tells a really bad joke",
    permission: 0,
    run: async function (message: Message): Promise<any> {
        Request({
            url: "https://icanhazdadjoke.com/",
            method: 'GET',
            headers: {
                'Accept': 'text/plain',
            }
        }, (error, response, body) => {
            return message.thread.broadcastText(body);
        });
    }
}