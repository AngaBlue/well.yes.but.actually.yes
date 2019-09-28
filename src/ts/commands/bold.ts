import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "bold",
    aliases: [],
    usage: "bold <message>",
    description: "Bolds a message",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        if (!message.args[0])
            return message.thread.broadcastText("Please enter a message to bold")
        return message.thread.broadcastText(message.argsString.__bold())
    }
}