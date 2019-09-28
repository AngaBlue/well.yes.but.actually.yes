import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "say",
    aliases: [],
    usage: "say <message>",
    description: "Says whatever you say",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        if (!message.args[0])
            return message.thread.broadcastText("I can't just say nothing!")
        //Zero Width Space Added to Start of Message
        return message.thread.broadcastText(`​${message.argsString}`)
    }
}