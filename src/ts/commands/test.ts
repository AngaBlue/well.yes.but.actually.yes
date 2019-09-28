import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "test",
    aliases: ["t"],
    usage: "test",
    description: "Test command",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        return message.thread.broadcastText(`Bot is online and responding!`)
    }
}