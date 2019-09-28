import index = require("../index")
import { Message } from "../typings/Client/Message";
import { inspect } from "util";
module.exports = {
    name: "eval",
    aliases: [],
    usage: "eval <statement>",
    description: "Evaluates a statement",
    permission: 5,
    run: async function (message: Message): Promise<any> {
        const index = require("../index")
        try {
            let evaled = eval(message.argsString);
            if (typeof evaled !== "string")
                evaled = inspect(evaled);
            return message.thread.broadcastText(evaled);
        } catch (err) {
            return message.thread.broadcastText(err.toString());
        }
    }
}