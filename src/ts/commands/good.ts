import index = require("../index")
import { Message } from "../typings/Client/Message";
module.exports = {
    name: "good",
    aliases: [],
    usage: "good boi",
    description: "Makes this boi happy",
    permission: 0,
    run: async function(message: Message): Promise<any> {
        if (!message.args[0] || ["bot", "boi", "boy"].indexOf(message.args[0].toLowerCase()) === -1) return
            return message.thread.broadcastText("❤️")
    }
}